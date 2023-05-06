import { Kysely, PostgresDialect } from 'kysely';
import Pool from 'pg-pool';
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
}
export const db = new Kysely({
    dialect: new PostgresDialect({
        pool: new Pool({
            connectionString: process.env.DATABASE_URL,
        }),
    }),
});
