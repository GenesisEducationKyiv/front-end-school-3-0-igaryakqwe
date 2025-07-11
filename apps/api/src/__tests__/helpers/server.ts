import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import Fastify, { FastifyInstance } from 'fastify';
import fs from 'fs/promises';
import path from 'path';
import { afterAll, beforeAll } from 'vitest';

import config from '../../config';
import { initializeDb } from '../../utils/db';

// Test data paths from config
const TEST_DATA_DIR = config.storage.dataDir;
const TEST_TRACKS_DIR = config.storage.tracksDir;
const TEST_UPLOADS_DIR = config.storage.uploadsDir;
const TEST_GENRES_FILE = config.storage.genresFile;

export async function setupTestData() {
  // Create test directories
  await fs.mkdir(TEST_DATA_DIR, { recursive: true });
  await fs.mkdir(TEST_TRACKS_DIR, { recursive: true });
  await fs.mkdir(TEST_UPLOADS_DIR, { recursive: true });

  // Create genres file
  const genres = [
    'Rock',
    'Pop',
    'Hip Hop',
    'Jazz',
    'Classical',
    'Electronic',
    'R&B',
    'Country',
    'Folk',
    'Reggae',
    'Metal',
    'Blues',
    'Indie',
  ];
  await fs.writeFile(TEST_GENRES_FILE, JSON.stringify(genres, null, 2));
}

export async function cleanupTestData() {
  try {
    // Try to remove all files in tracks directory
    try {
      const files = await fs.readdir(TEST_TRACKS_DIR);
      for (const file of files) {
        await fs.unlink(path.join(TEST_TRACKS_DIR, file));
      }
    } catch {
      /* Ignore errors */
    }

    // Try to remove all files in uploads directory
    try {
      const files = await fs.readdir(TEST_UPLOADS_DIR);
      for (const file of files) {
        await fs.unlink(path.join(TEST_UPLOADS_DIR, file));
      }
    } catch {
      /* Ignore errors */
    }

    // Try to remove the genres file
    try {
      await fs.unlink(TEST_GENRES_FILE);
    } catch {
      /* Ignore errors */
    }

    // Try to remove the directories
    try {
      await fs.rmdir(TEST_TRACKS_DIR);
      await fs.rmdir(TEST_UPLOADS_DIR);
      await fs.rmdir(TEST_DATA_DIR);
    } catch {
      // Log error but don't fail the test
      console.log(
        'Could not completely clean up test directories. This is OK for CI environments.'
      );
    }
  } catch {
    // Log error but don't fail the test
    console.log('Error in test cleanup. This is OK for CI environments.');
  }
}

export async function buildServer(): Promise<FastifyInstance> {
  // Initialize test database
  await setupTestData();
  await initializeDb();

  const server = Fastify({
    logger: false, // Disable logging for tests
  });

  // Register plugins
  await server.register(cors, {
    origin: config.cors.origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await server.register(multipart, {
    limits: {
      fileSize: config.upload.maxFileSize,
    },
  });

  // Serve static files (uploads) from test directory
  await server.register(fastifyStatic, {
    root: TEST_UPLOADS_DIR,
    prefix: '/api/files/',
    decorateReply: false,
  });

  return server;
}

// Helper to set up test hooks
export function setupTestServer() {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = await buildServer();
  });

  afterAll(async () => {
    await server.close();
    await cleanupTestData();
  });

  return () => server;
}
