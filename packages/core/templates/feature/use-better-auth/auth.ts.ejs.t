---
to: <%= name %>/src/lib/auth.ts
db: "<%= db %>"
adapter: "<%= adapter %>"
---
import { betterAuth } from "better-auth";


<% if (adapter === 'drizzle') { %>
import { drizzleAdapter } from "better-auth/adapters/drizzle"; 
// add drizzle instance here
import { db } from "./db";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "<%= db %>",
    })
});

<% } if (adapter === 'prisma') { %>
import { PrismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/db";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "<%= db %>",
    }),
});

<% } if (adapter === 'none' && db === 'postgres') { %>
import { Pool } from "pg"
export const auth = betterAuth({
    database: new Pool({
      // connection options
    })
});
<% } %>

<% if (adapter === 'none' && db === 'mysql') { %>
import { createPool } from "mysql2/promise";
export const auth = betterAuth({
    database: createPool({
        // connection options
    })
});
<% } %>

<% if (adapter === 'none' && db === 'sqlite') { %>
import { Database } from "better-sqlite3";
export const auth = betterAuth({
    database: new Database("path/to/database.db")
});
<% } %>



