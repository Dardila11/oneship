---
to: <%= name %>/package.json
inject: true
after: '"dependencies": {'
db: "<%= db %>"
---
    "better-auth": "^1.0.0",
<% if (db === 'postgres') { %>
    "pg": "^8.11.3",
    "drizzle-orm": "^0.29.3",
<% } else if (db === 'mysql') { %>
    "mysql2": "^3.9.1",
    "drizzle-orm": "^0.29.3",
<% } %> 