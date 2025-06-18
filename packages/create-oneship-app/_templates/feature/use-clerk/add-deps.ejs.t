---
to: <%= name %>/package.json
inject: true
after: '"dependencies": {'
---
"@clerk/nextjs": "^5.2.4", 