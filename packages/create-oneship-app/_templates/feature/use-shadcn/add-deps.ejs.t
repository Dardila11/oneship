---
to: <%= name %>/package.json
inject: true
after: '"dependencies": {'
---
    "tailwind-variants": "^0.2.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.4.0", 