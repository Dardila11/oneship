---
to: <%= name %>/package.json
---
{
  "name": "<%= h.inflection.dasherize(name) %>",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "next": "15.3.3"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "@types/node": "^24.0.1",
    "@types/react": "^19.1.8",
    "@types/react-dom": "^19.1.6",
    "postcss": "^8.5.5",
    "tailwindcss": "^4.1.10",
    "eslint": "^9.29.0",
    "eslint-config-next": "15.3.3"
  }
} 