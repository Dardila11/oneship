---
to: <%= name %>/tsconfig.json
inject: true
after: "compilerOptions"
---
{
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    },

} 