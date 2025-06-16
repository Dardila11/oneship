---
to: <%= name %>/.env
inject: true
append: true
---

# NextAuth.js
AUTH_SECRET="your-super-secret-key-here" # Replace with output from: openssl rand -base64 32
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET="" 