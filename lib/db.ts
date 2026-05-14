import mongoose from 'mongoose';
import { logger } from './logger';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  logger.warn('MONGODB_URI is not set — Mongoose calls will fail. See .env.example.');
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Cache the connection across hot reloads in dev (Next.js re-runs server modules).
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
if (!global.mongooseCache) global.mongooseCache = cache;

export async function connectMongo(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not configured');
    }
    cache.promise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME ?? 'platt_partners',
      bufferCommands: false,
    });
  }

  cache.conn = await cache.promise;
  logger.info({ db: cache.conn.connection.name }, 'Mongo connected');
  return cache.conn;
}
