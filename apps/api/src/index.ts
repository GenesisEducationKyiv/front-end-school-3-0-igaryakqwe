import { fastifyConnectPlugin } from '@connectrpc/connect-fastify';
import fastifyCompress from '@fastify/compress';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { GenresService } from '@grpc-generated/proto/genres_pb';
import { TracksService } from '@grpc-generated/proto/tracks_pb';
import Fastify from 'fastify';
import fastifySocketIO from 'fastify-socket.io';

import config from './config';
import { ActiveTrackManager } from './services/active-track.service';
import { genresService } from './services/genres.service';
import { tracksService } from './services/tracks.service';
import { downloadAllTrackImages, initializeDb } from './utils/db';

async function start() {
  try {
    console.log(`Starting server in ${config.server.env} mode`);
    await initializeDb();
    await downloadAllTrackImages();

    const fastify = Fastify({
      logger: {
        level: config.logger.level,
        transport: config.isDevelopment
          ? {
              target: 'pino-pretty',
              options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
              },
            }
          : undefined,
      },
    });

    await fastify.register(cors, {
      origin: config.cors.origin,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Connect-Protocol-Version',
        'Connect-Timeout-Ms',
      ],
    });

    await fastify.register(multipart, {
      limits: {
        fileSize: config.upload.maxFileSize,
      },
    });

    await fastify.register(fastifyStatic, {
      root: config.storage.uploadsDir,
      prefix: '/api/files/',
      decorateReply: false,
      setHeaders: (res, path) => {
        if (path.endsWith('.webp')) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      },
    });

    await fastify.register(fastifyCompress, {
      global: true,
    });

    await fastify.register(fastifyConnectPlugin, {
      prefix: '/api',
      routes(router) {
        router.service(GenresService, genresService);
        router.service(TracksService, tracksService);
      },
    });

    // REST endpoint to return array of image names
    fastify.get('/api/images', async (request, reply) => {
      const fs = await import('fs/promises');
      const path = await import('path');
      const imagesDir = path.join(config.storage.uploadsDir, 'images');
      try {
        const files = await fs.readdir(imagesDir);
        return files;
      } catch (err) {
        console.error('Error reading images directory:', err);
        reply.status(500).send({ error: 'Unable to read images directory' });
      }
    });

    await fastify.register(fastifySocketIO, {
      cors: {
        origin: config.cors.origin,
        methods: ['GET', 'POST'],
      },
    });

    fastify.ready().then(() => {
      const activeTrackManager = new ActiveTrackManager(fastify.io);
      activeTrackManager.start();
    });

    fastify.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    await fastify.listen({
      port: config.server.port,
      host: config.server.host,
    });

    console.log(
      `Server is running on http://${config.server.host}:${config.server.port}`
    );
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

start();
