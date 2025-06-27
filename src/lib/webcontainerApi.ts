// Configuration de l'API WebContainer
const WEBCONTAINER_API_KEY = import.meta.env.VITE_WEBCONTAINER_API_KEY;

export interface WebContainerConfig {
  apiKey: string;
  environment?: 'development' | 'production';
}

// Configuration par défaut
export const webcontainerConfig: WebContainerConfig = {
  apiKey: WEBCONTAINER_API_KEY || '',
  environment: 'development'
};

// Vérifier si l'API WebContainer est configurée
export const isWebContainerConfigured = (): boolean => {
  return !!webcontainerConfig.apiKey;
};

// Initialiser WebContainer avec la clé API
export const initializeWebContainer = async () => {
  if (!isWebContainerConfigured()) {
    console.warn('WebContainer API key not configured. Please add VITE_WEBCONTAINER_API_KEY to your environment variables.');
    return null;
  }

  try {
    // Import dynamique de WebContainer
    const { WebContainer } = await import('@webcontainer/api');
    
    // Initialiser avec la configuration
    const webcontainer = await WebContainer.boot({
      // Configuration avec la clé API si nécessaire
      // Note: WebContainer peut ne pas nécessiter de clé API selon la version
    });

    console.log('WebContainer initialized successfully');
    return webcontainer;
  } catch (error) {
    console.error('Failed to initialize WebContainer:', error);
    return null;
  }
};

// Créer un projet de base
export const createBaseProject = async (webcontainer: any) => {
  const files = {
    'package.json': {
      file: {
        contents: JSON.stringify({
          name: 'daxly-project',
          version: '1.0.0',
          type: 'module',
          scripts: {
            dev: 'vite',
            build: 'vite build',
            preview: 'vite preview'
          },
          dependencies: {
            'react': '^18.2.0',
            'react-dom': '^18.2.0'
          },
          devDependencies: {
            '@types/react': '^18.2.0',
            '@types/react-dom': '^18.2.0',
            '@vitejs/plugin-react': '^4.0.0',
            'vite': '^4.4.0'
          }
        }, null, 2)
      }
    },
    'index.html': {
      file: {
        contents: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Daxly Project</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`
      }
    },
    'vite.config.js': {
      file: {
        contents: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`
      }
    },
    'src': {
      directory: {
        'main.jsx': {
          file: {
            contents: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`
          }
        },
        'App.jsx': {
          file: {
            contents: `import React from 'react'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Welcome to Daxly</h1>
      <p>Your AI-powered development environment is ready!</p>
    </div>
  )
}

export default App`
          }
        },
        'App.css': {
          file: {
            contents: `#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.App {
  padding: 2rem;
}

h1 {
  color: #333;
  margin-bottom: 1rem;
}

p {
  color: #666;
  font-size: 1.1rem;
}`
          }
        },
        'index.css': {
          file: {
            contents: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}`
          }
        }
      }
    }
  };

  await webcontainer.mount(files);
  return files;
};