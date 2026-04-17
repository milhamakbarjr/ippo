import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';

// Lazy singleton — defer initialization until first use inside a request handler.
// Top-level throws crash Cloudflare Workers SSR before process.env is populated.
let _db: NeonHttpDatabase<typeof schema> | undefined;

function getDb(): NeonHttpDatabase<typeof schema> {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('Missing required environment variable: DATABASE_URL');
    _db = drizzle(neon(url), { schema });
  }
  return _db;
}

export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver);
  },
});
