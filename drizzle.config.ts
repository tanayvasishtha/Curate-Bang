import type { Config } from 'drizzle-kit/pg';

export default {
    schema: './lib/db/schema.ts',
    out: './drizzle',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
} satisfies Config;
