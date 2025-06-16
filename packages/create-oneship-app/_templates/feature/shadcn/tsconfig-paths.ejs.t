---
to: <%= name %>/tsconfig.json
inject: true
after: "baseUrl"
---
,
    "paths": {
      "@/*": ["./*"]
    } 