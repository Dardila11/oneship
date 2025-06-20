---
to: <%= name %>/.env
inject: true
append: true
db: "<%= db %>"
---

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-min-32-chars
BETTER_AUTH_URL=http://localhost:3000

# Database Configuration
<% if (db === 'postgres') { %>
DATABASE_URL=postgresql://user:password@localhost:5432/your_database
<% } else if (db === 'mysql') { %>
DATABASE_URL=mysql://user:password@localhost:3306/your_database
<% } %>