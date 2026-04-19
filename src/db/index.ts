import { drizzle as drizzleHttp } from 'drizzle-orm/neon-http';
import { drizzle as drizzleWs } from 'drizzle-orm/neon-serverless';
import { neon } from '@neondatabase/serverless';
import { Pool } from '@neondatabase/serverless';
import * as schema from './schema';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import type { NeonDatabase } from 'drizzle-orm/neon-serverless';

// Lazy singletons — defer initialization until first use inside a request handler.
// Top-level throws crash Cloudflare Workers SSR before process.env is populated.

// HTTP driver: used for all regular queries (fast, no WebSocket needed)
let _db: NeonHttpDatabase<typeof schema> | undefined;

function getDb(): NeonHttpDatabase<typeof schema> {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('Missing required environment variable: DATABASE_URL');
    _db = drizzleHttp(neon(url), { schema });
  }
  return _db;
}

export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver);
  },
});

// WebSocket driver: used only when transactions are needed
let _txDb: NeonDatabase<typeof schema> | undefined;

function getTxDb(): NeonDatabase<typeof schema> {
  if (!_txDb) {
    const url = process.env.DATABASE_URL_DIRECT ?? process.env.DATABASE_URL;
    if (!url) throw new Error('Missing required environment variable: DATABASE_URL_DIRECT or DATABASE_URL');
    const pool = new Pool({ connectionString: url });
    _txDb = drizzleWs(pool, { schema });
  }
  return _txDb;
}

export const txDb = new Proxy({} as NeonDatabase<typeof schema>, {
  get(_, prop, receiver) {
    return Reflect.get(getTxDb(), prop, receiver);
  },
});
