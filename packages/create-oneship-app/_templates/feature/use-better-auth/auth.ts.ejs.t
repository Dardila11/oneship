---
to: <%= name %>/src/lib/auth.ts
db: "<%= db %>"
---
import { BetterAuth } from "better-auth";
import { db } from "./db";
<% if (db === 'postgres') { %>
import { PostgresAdapter } from "better-auth/adapters/postgres";
<% } else if (db === 'mysql') { %>
import { MySQLAdapter } from "better-auth/adapters/mysql";
<% } %>

export const { auth, signIn, signOut } = BetterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  adapter: <% if (db === 'postgres') { %>
    PostgresAdapter(db),
  <% } else if (db === 'mysql') { %>
    MySQLAdapter(db),
  <% } %>
  callbacks: {
    // Add your custom callbacks here
  },
});