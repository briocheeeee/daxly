# 🚀 Daxly - AI-Powered Web Development Platform

<div align="center">

![Daxly Logo](https://files.catbox.moe/2v22dq.png)

**Build fullstack web applications with AI assistance**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green.svg)](https://supabase.com/)

[Demo](https://daxly.dev) • [Documentation](https://daxly.dev/docs) • [Report Bug](https://github.com/briocheeeee/daxly/issues) • [Request Feature](https://github.com/briocheeeee/daxly/issues)

</div>

## ✨ Features

- 🤖 **AI-Powered Development** - Generate code with Claude 3.5 Haiku
- 💬 **Interactive Chat Interface** - Natural language programming
- 🔐 **Secure Authentication** - User management with Supabase Auth
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- ⚡ **Real-time Environment** - Live code execution with WebContainer
- 🎨 **Premium UI/UX** - Glass morphism effects and smooth animations
- 🔄 **Project Management** - Save, share, and collaborate on projects
- 📊 **Analytics Dashboard** - Track your development progress

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript, Tailwind CSS |
| **Backend** | Supabase (PostgreSQL, Auth, Real-time) |
| **AI Integration** | Claude 3.5 Haiku API |
| **Development Environment** | WebContainer API |
| **Build Tool** | Vite |
| **Styling** | Custom CSS with premium effects |
| **Icons** | Lucide React |
| **Routing** | React Router DOM |

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- A **Supabase** account
- A **Claude API** key (optional, for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/briocheeeee/daxly.git
   cd daxly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Configure your `.env` file**
   ```env
   # Supabase Configuration (Required)
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Claude API Configuration (Optional - for AI features)
   VITE_CLAUDE_API_KEY=your_claude_api_key
   
   # WebContainer API Configuration (Optional - for live coding)
   VITE_WEBCONTAINER_API_KEY=your_webcontainer_api_key
   ```

5. **Set up Supabase database**
   ```bash
   # Install Supabase CLI (if not already installed)
   npm install -g supabase
   
   # Initialize Supabase in your project
   supabase init
   
   # Link to your Supabase project
   supabase link --project-ref your-project-ref
   
   # Push the database schema
   supabase db push
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

## 📊 Database Schema

The application uses the following main tables:

### `profiles`
- User profile information
- Links to Supabase Auth users
- Stores username and metadata

### `chats`
- Chat conversations with AI
- Stores conversation history
- Links to user profiles

### Migration Files
- `supabase/migrations/` contains all database migrations
- Run `supabase db push` to apply migrations

## 🏗 Project Structure

```
daxly/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ChatPage.tsx   # Main chat interface
│   │   ├── HomePage.tsx   # Landing page
│   │   ├── LoginPage.tsx  # Authentication
│   │   └── ...
│   ├── contexts/          # React contexts
│   │   └── AuthContext.tsx
│   ├── lib/               # Utility libraries
│   │   ├── supabase.ts    # Supabase client
│   │   ├── claudeApi.ts   # Claude API integration
│   │   └── ...
│   ├── styles/            # CSS files
│   └── main.tsx           # Application entry point
├── supabase/
│   └── migrations/        # Database migrations
├── .env.example           # Environment variables template
└── README.md             # This file
```

## 🎨 Key Components

### Chat Interface
- Real-time messaging with AI
- Image upload support
- Code syntax highlighting
- Message history persistence

### Authentication System
- Email/password authentication
- Social login (GitHub, Google)
- Protected routes
- User profile management

### AI Integration
- Claude 3.5 Haiku for code generation
- Context-aware responses
- Multiple conversation threads
- Code explanation and optimization

## 🔧 Configuration

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the API settings
3. Enable Row Level Security (RLS) on your tables
4. Configure authentication providers if needed

### Claude API Setup

1. Sign up at [console.anthropic.com](https://console.anthropic.com)
2. Generate an API key
3. Add it to your `.env` file as `VITE_CLAUDE_API_KEY`

### WebContainer Setup

1. Get access to WebContainer API
2. Add your API key to `.env` as `VITE_WEBCONTAINER_API_KEY`

## 🚀 Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push to main branch

### Vercel

1. Import your project to Vercel
2. Configure environment variables
3. Deploy with automatic CI/CD

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the dist/ folder to your hosting provider
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Run `npm run lint` before committing
- Write meaningful commit messages

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🐛 Troubleshooting

### Common Issues

**Environment Variables Not Loading**
- Ensure your `.env` file is in the root directory
- Restart the development server after changing environment variables

**Supabase Connection Issues**
- Verify your Supabase URL and keys are correct
- Check if your Supabase project is active

**Claude API Errors**
- Verify your API key is valid
- Check your API usage limits

### Getting Help

- 📖 [Documentation](https://docs.daxly.dev)
- 💬 [Discord Community](https://discord.gg/daxly)
- 🐛 [GitHub Issues](https://github.com/briocheeeee/daxly/issues)
- 📧 [Email Support](mailto:support@china.cn)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Supabase](https://supabase.com/) - Backend as a Service
- [Anthropic](https://www.anthropic.com/) - Claude AI API
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Icon library
- [WebContainer](https://webcontainer.io/) - Browser-based development environment

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=briocheeeee/daxly&type=Date)](https://star-history.com/#briocheeeee/daxly&Date)

---

<div align="center">

**Made with ❤️ by the Daxly Team (only Brioche xD)**

[Website](https://daxly.dev) • [Twitter](https://x.com/Brioche_Pl) • [Discord](https://discord.gg/uPHXE2JsK4)

</div>
