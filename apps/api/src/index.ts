import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { fastifyConnectPlugin } from '@connectrpc/connect-fastify';
import fastifySocketIO from 'fastify-socket.io';

import config from './config';
import { initializeDb } from './utils/db';
import { GenresService } from '@grpc-generated/proto/genres_pb';
import { genresService } from './services/genres.service';
import { TracksService } from '@grpc-generated/proto/tracks_pb';
import { tracksService } from './services/tracks.service';
import { ActiveTrackManager } from './services/active-track.service';

async function start() {
  try {
    console.log(`Starting server in ${config.server.env} mode`);
    await initializeDb();

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
    });

    await fastify.register(fastifyConnectPlugin, {
      prefix: '/api',
      routes(router) {
        router.service(GenresService, genresService);
        router.service(TracksService, tracksService);
      },
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
