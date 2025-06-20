---
to: <%= name %>/package.json
inject: true
after: '"devDependencies": {'
---
    "drizzle-kit": "^0.20.14",
<% if (db === 'postgres') { %>
    "@types/pg": "^8.11.0",
<% } %> 