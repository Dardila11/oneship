---
to: <%= name %>/drizzle.config.ts
db: "<%= db %>"
force: true
---
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle/migrations',
  schema: './drizzle/schema.ts',
<% if (db === 'postgres') { %>
  dialect: 'pg',
<% } else if (db === 'mysql') { %>
  dialect: 'mysql2',
<% } else if (db === 'sqlite') { %>
  dialect: 'sqlite',
<% } %>
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
  verbose: true,
  strict: true,
}); 