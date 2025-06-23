---
to: <%= name %>/src/lib/db/client.ts
db: "<%= db %>"
force: true
---
<% if (db === 'postgres') { %>
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../../../drizzle/schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
<% } else if (db === 'mysql') { %>
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../../../drizzle/schema';

const pool = mysql.createPool(process.env.DATABASE_URL ?? '');

export const db = drizzle(pool, { schema, mode: 'default' });
<% } %>

export type DB = typeof db; 