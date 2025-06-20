---
to: <%= name %>/package.json
inject: true
after: '"start": "next start",'
db: "<%= db %>"
---
<% if (db === 'postgres') { %>
    "db:generate": "drizzle-kit generate:pg",
    "db:push": "drizzle-kit push:pg",
    "db:studio": "drizzle-kit studio",
    "db:migrate": "drizzle-kit migrate:pg",
    "db:pull": "drizzle-kit pull:pg",
<% } else if (db === 'mysql') { %>
    "db:generate": "drizzle-kit generate:mysql",
    "db:push": "drizzle-kit push:mysql",
    "db:studio": "drizzle-kit studio",
    "db:migrate": "drizzle-kit migrate:mysql",
    "db:pull": "drizzle-kit pull:mysql",
<% } %> 