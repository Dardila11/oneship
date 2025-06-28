---
to: <%= name %>/package.json
inject: true
after: '"start": "next start",'
---

"db:generate": "npx drizzle-kit generate",
"db:push": "npx drizzle-kit push",
"db:studio": "npx drizzle-kit studio",
"db:migrate": "npx drizzle-kit migrate",
"db:pull": "npx drizzle-kit pull",