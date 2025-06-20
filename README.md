# OneShip 🚀

> The One to Ship Your Apps: Build, Launch, and Scale Faster

OneShip is a powerful command-line interface (CLI) tool designed to accelerate your application development workflow. Whether you're building a SaaS platform, e-commerce site, blog, or any modern web application, OneShip combines the best of Next.js with AI capabilities to help you ship production-ready applications faster.

## Features ✨

- **🎯 Quick Start**: Set up a new Next.js project with all essential features
- **🤖 AI Integration**: Flexible BYOK (Bring Your Own Key) system supporting multiple AI providers
- **🔐 Authentication**: Pre-configured auth templates with your choice of providers
- **📊 Database**: Streamlined database setup with ORM integration
- **🎨 UI & Styling**: Modern UI templates with Tailwind CSS and your preferred component library
- **🛠️ Developer Experience**: Smart CLI that adapts to your development environment
- **📱 App Types**: Support for various application types:
  - Web Applications
  - SaaS Platforms
  - E-commerce Sites
  - Blogs & CMS
  - Dashboards
  - API Services
  - Progressive Web Apps

## Quick Start 🚀

```bash
# Create a new project
npx create-oneship-app my-app

# Follow the interactive prompts to configure your project
```

## Installation 📦

```bash
npm install -g create-oneship-app
```

## Usage 💻

### Creating a New Project

```bash
create-oneship-app my-app
```

Options:

- `--template=<type>` - Choose application type (web, saas, ecommerce, blog, api)
- `--auth=next-auth` - Specify authentication provider
- `--db=drizzle` - Choose database ORM
- `--db-type=postgres` - Select database type
- `--ui=shadcn` - Pick UI component library

### Adding Features

```bash
cd my-app
oneship add feature dashboard
oneship add feature api
oneship add feature blog
```

## AI Integration 🤖

OneShip supports multiple AI providers through its BYOK system:

1. Configure your AI provider:

```bash
oneship config set ai.provider anthropic
oneship config set ai.key your-api-key
```

2. Use AI features:

```bash
oneship ai analyze
oneship ai optimize
oneship ai generate-component
```

## Project Structure 📁

```
my-app/
├── src/
│   ├── app/
│   ├── features/
│   │   ├── auth/
│   │   ├── api/
│   │   └── [your-features]/
│   └── lib/
│       └── db/
├── public/
└── package.json
```

## Documentation 📚

For detailed documentation, visit:

- [Getting Started](docs/getting-started.md)
- [Templates & App Types](docs/templates.md)
- [Authentication](docs/authentication.md)
- [Database Setup](docs/database.md)
- [AI Features](docs/ai-features.md)
- [API Integration](docs/api.md)

## Contributing 🤝

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License 📄

MIT © OneShip

---

<p align="center">Built with ❤️ for shipping apps faster</p>
