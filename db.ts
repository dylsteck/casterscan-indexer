import { Kysely, PostgresDialect } from 'kysely'
import Pool from 'pg-pool'
import type { Database } from './types/database.t';

if (!process.env.PG_URL) {
  throw new Error('PG_URL is not set')
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.PG_URL,
    }),
  }),
});
