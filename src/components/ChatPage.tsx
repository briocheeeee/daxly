import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Paperclip, Play, Square, ExternalLink, Smartphone, Maximize2, Plus, FolderPlus, FileText, Folder, ChevronRight, ChevronDown, Image, Code2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { getChatById, addMessageToChat, ChatMessage } from '../lib/chatDatabase';
import { sendMessageToClaude, generateCodeWithClaude } from '../lib/claudeApi';
import { initializeWebContainer, createBaseProject } from '../lib/webcontainerApi';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  expanded?: boolean;
}

const ChatPage = () => {
  const { user } = useAuth();
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  
  const [chat, setChat] = useState<any>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [responsiveMode, setResponsiveMode] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [fileContent, setFileContent] = useState<string>('');
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; target: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Array<{ file: File; url: string; id: string }>>([]);
  
  const webcontainerRef = useRef<any>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Structure de fichiers
  const [fileTree, setFileTree] = useState<FileNode[]>([
    {
      name: 'src',
      type: 'folder',
      expanded: true,
      children: [
        { name: 'App.jsx', type: 'file', content: 'import React from "react";\n\nfunction App() {\n  return (\n    <div className="App">\n      <h1>Hello World</h1>\n    </div>\n  );\n}\n\nexport default App;' },
        { name: 'index.css', type: 'file', content: 'body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto";\n}' }
      ]
    },
    { name: 'package.json', type: 'file', content: '{\n  "name": "my-app",\n  "version": "0.1.0",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build"\n  }\n}' },
    { name: 'index.html', type: 'file', content: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My App</title>\n</head>\n<body>\n  <div id="root"></div>\n</body>\n</html>' }
  ]);

  // Charger le chat au montage
  useEffect(() => {
    const loadChat = async () => {
      if (!chatId || !user) return;

      try {
        const chatData = await getChatById(chatId);
        if (chatData) {
          setChat(chatData);
          setMessages(chatData.messages || []);
        } else {
          // Chat non trouvé, rediriger vers l'accueil
          navigate('/');
        }
      } catch (error) {
        console.error('Error loading chat:', error);
        navigate('/');
      }
    };

    loadChat();
  }, [chatId, user, navigate]);

  // Initialiser WebContainer
  useEffect(() => {
    const initWebContainer = async () => {
      try {
        const webcontainer = await initializeWebContainer();
        if (webcontainer) {
          webcontainerRef.current = webcontainer;
          
          // Créer le projet de base
          await createBaseProject(webcontainer);
          
          // Écouter les événements
          webcontainer.on('server-ready', (port: number, url: string) => {
            setPreviewUrl(url);
            addTerminalOutput(`Server ready on ${url}`);
          });

          addTerminalOutput('WebContainer initialized successfully');
        } else {
          addTerminalOutput('Failed to initialize WebContainer - API key may be missing');
        }
      } catch (error) {
        console.error('Failed to initialize WebContainer:', error);
        addTerminalOutput('Failed to initialize WebContainer');
      }
    };

    initWebContainer();
  }, []);

  // Auto-scroll des messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-scroll du terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const addTerminalOutput = (output: string) => {
    setTerminalOutput(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${output}`]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !chatId || !user) return;

    setIsLoading(true);

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      content: inputValue,
      type: 'user',
      timestamp: new Date(),
      images: uploadedImages.map(img => img.url)
    };

    // Ajouter le message utilisateur
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');

    // Nettoyer les images
    uploadedImages.forEach(img => URL.revokeObjectURL(img.url));
    setUploadedImages([]);

    try {
      // Sauvegarder le message utilisateur
      await addMessageToChat(chatId, userMessage);

      // Préparer le contexte pour Claude
      const conversationHistory = [...messages, userMessage].map(msg => ({
        role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content
      }));

      // Envoyer à Claude
      const claudeResponse = await sendMessageToClaude(conversationHistory);

      if (claudeResponse.success && claudeResponse.response) {
        const aiMessage: ChatMessage = {
          id: `msg_${Date.now() + 1}`,
          content: claudeResponse.response,
          type: 'assistant',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
        await addMessageToChat(chatId, aiMessage);

        // Si la réponse contient du code, l'analyser et l'ajouter aux fichiers
        const codeMatch = claudeResponse.response.match(/```(\w+)?\n([\s\S]*?)\n```/g);
        if (codeMatch) {
          // Traiter le code généré
          addTerminalOutput('Code generated by AI - ready to run');
        }
      } else {
        // Message d'erreur
        const errorMessage: ChatMessage = {
          id: `msg_${Date.now() + 1}`,
          content: "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer.",
          type: 'assistant',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, errorMessage]);
        await addMessageToChat(chatId, errorMessage);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        content: "Une erreur s'est produite. Veuillez réessayer.",
        type: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      if (uploadedImages.length < 2 && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        const id = Math.random().toString(36).substr(2, 9);
        
        setUploadedImages(prev => [...prev, { file, url, id }]);
      }
    });
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (id: string) => {
    setUploadedImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  const runDevServer = async () => {
    if (!webcontainerRef.current) {
      addTerminalOutput('WebContainer not initialized');
      return;
    }

    setIsRunning(true);
    addTerminalOutput('Starting development server...');

    try {
      // Installer les dépendances
      const installProcess = await webcontainerRef.current.spawn('npm', ['install']);
      installProcess.output.pipeTo(new WritableStream({
        write(data) {
          addTerminalOutput(data);
        }
      }));

      await installProcess.exit;

      // Démarrer le serveur de développement
      const devProcess = await webcontainerRef.current.spawn('npm', ['run', 'dev']);
      devProcess.output.pipeTo(new WritableStream({
        write(data) {
          addTerminalOutput(data);
        }
      }));

    } catch (error) {
      addTerminalOutput(`Error: ${error}`);
      setIsRunning(false);
    }
  };

  const stopDevServer = () => {
    setIsRunning(false);
    addTerminalOutput('Development server stopped');
  };

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node, index) => (
      <div key={`${node.name}-${index}`} style={{ marginLeft: `${depth * 16}px` }}>
        <div
          className={`flex items-center gap-2 px-2 py-1 hover:bg-accent/30 cursor-pointer rounded text-sm ${
            selectedFile === node.name ? 'bg-accent/50' : ''
          }`}
          onClick={() => {
            if (node.type === 'file') {
              setSelectedFile(node.name);
              setFileContent(node.content || '');
            } else {
              const updateTree = (tree: FileNode[]): FileNode[] => {
                return tree.map(item => {
                  if (item.name === node.name && item.type === 'folder') {
                    return { ...item, expanded: !item.expanded };
                  }
                  if (item.children) {
                    return { ...item, children: updateTree(item.children) };
                  }
                  return item;
                });
              };
              setFileTree(updateTree(fileTree));
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setContextMenu({ x: e.clientX, y: e.clientY, target: node.name });
          }}
        >
          {node.type === 'folder' ? (
            <>
              {node.expanded ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
              <Folder className="size-4 text-blue-500" />
            </>
          ) : (
            <>
              <div className="w-3" />
              <FileText className="size-4 text-gray-500" />
            </>
          )}
          <span className="text-foreground">{node.name}</span>
        </div>
        {node.type === 'folder' && node.expanded && node.children && (
          <div>
            {renderFileTree(node.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  const handleCreateFile = () => {
    const fileName = prompt('Nom du fichier:');
    if (fileName) {
      const newFile: FileNode = {
        name: fileName,
        type: 'file',
        content: ''
      };
      setFileTree(prev => [...prev, newFile]);
    }
    setContextMenu(null);
  };

  const handleCreateFolder = () => {
    const folderName = prompt('Nom du dossier:');
    if (folderName) {
      const newFolder: FileNode = {
        name: folderName,
        type: 'folder',
        children: [],
        expanded: false
      };
      setFileTree(prev => [...prev, newFolder]);
    }
    setContextMenu(null);
  };

  if (!chat) {
    return (
      <div className="dark min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement du chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dark" style={{ colorScheme: 'dark' }}>
      <div className="min-h-screen bg-background">
        {/* Background */}
        <div className="fixed inset-0 z-0 bg-background">
          <div className="fixed inset-0 hidden bg-gradient-to-b from-black via-black to-black dark:block">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/15 via-transparent to-transparent opacity-30"></div>
          </div>
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-4 border-b border-border/30">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-3 text-foreground hover:text-foreground/80 transition-colors">
              <ArrowLeft className="size-5" />
              <span className="text-sm font-medium">Back to Home</span>
            </a>
            <h1 className="font-heading text-xl text-foreground">{chat.title}</h1>
          </div>
          <a className="flex items-center" href="/">
            <span className="font-display text-foreground text-2xl">Daxly</span>
          </a>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex h-[calc(100vh-80px)]">
          {/* Chat Panel - Left Side */}
          <div className="w-1/3 border-r border-border/30 flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-muted/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="size-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-heading text-lg text-foreground mb-2">
                    Commencez votre conversation
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Décrivez ce que vous voulez créer et l'IA vous aidera à coder
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-xl ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'glass border border-border/30'
                      }`}
                    >
                      {message.images && message.images.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {message.images.map((imageUrl, index) => (
                            <img
                              key={index}
                              src={imageUrl}
                              alt="Uploaded"
                              className="w-20 h-20 object-cover rounded-lg border border-border/30"
                            />
                          ))}
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="glass border border-border/30 p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span className="text-sm text-muted-foreground">L'IA réfléchit...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border/30">
              {/* Image Preview */}
              {uploadedImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-lg border border-border/30"
                      />
                      <button
                        onClick={() => removeImage(image.id)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadedImages.length >= 2 || isLoading}
                  className="btn-premium p-2 glass border border-border/30 rounded-lg hover:bg-accent/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Ajouter une image"
                >
                  <Image className="size-4" />
                </button>
                <button 
                  className="btn-premium p-2 glass border border-border/30 rounded-lg hover:bg-accent/30 transition-all duration-200"
                  title="Joindre un fichier"
                >
                  <Paperclip className="size-4" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                    placeholder="Décrivez ce que vous voulez créer..."
                    disabled={isLoading}
                    className="w-full px-4 py-2 glass border border-border/30 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 disabled:opacity-50"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="btn-premium p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Envoyer le message"
                >
                  <Send className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Code Editor & Preview - Right Side */}
          <div className="flex-1 flex flex-col">
            {/* Tabs */}
            <div className="flex items-center justify-between border-b border-border/30 p-2">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    activeTab === 'code'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/30'
                  }`}
                >
                  <Code2 className="size-4" />
                  Code
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    activeTab === 'preview'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/30'
                  }`}
                >
                  <ExternalLink className="size-4" />
                  Preview
                </button>
              </div>

              {/* Preview Controls */}
              {activeTab === 'preview' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.open(previewUrl, '_blank')}
                    className="btn-premium p-2 glass border border-border/30 rounded-lg hover:bg-accent/30 transition-all duration-200"
                    title="Open in new tab"
                  >
                    <ExternalLink className="size-4" />
                  </button>
                  <button
                    onClick={() => setResponsiveMode(!responsiveMode)}
                    className={`btn-premium p-2 glass border border-border/30 rounded-lg transition-all duration-200 ${
                      responsiveMode ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/30'
                    }`}
                    title="Responsive mode"
                  >
                    <Smartphone className="size-4" />
                  </button>
                  <button
                    onClick={() => setFullScreen(!fullScreen)}
                    className="btn-premium p-2 glass border border-border/30 rounded-lg hover:bg-accent/30 transition-all duration-200"
                    title="Full screen"
                  >
                    <Maximize2 className="size-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="flex-1 flex">
              {activeTab === 'code' ? (
                <>
                  {/* File Explorer */}
                  <div className="w-64 border-r border-border/30 p-2 overflow-y-auto">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-foreground text-sm">Explorer</h3>
                      <div className="flex gap-1">
                        <button
                          onClick={handleCreateFile}
                          className="btn-premium p-1 hover:bg-accent/30 rounded transition-all duration-200"
                          title="Create File"
                        >
                          <Plus className="size-3" />
                        </button>
                        <button
                          onClick={handleCreateFolder}
                          className="btn-premium p-1 hover:bg-accent/30 rounded transition-all duration-200"
                          title="Create Folder"
                        >
                          <FolderPlus className="size-3" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {renderFileTree(fileTree)}
                    </div>
                  </div>

                  {/* Code Editor */}
                  <div className="flex-1 flex flex-col">
                    {/* Editor Header */}
                    <div className="flex items-center justify-between p-2 border-b border-border/30">
                      <span className="text-sm text-foreground">{selectedFile || 'Select a file'}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={isRunning ? stopDevServer : runDevServer}
                          disabled={!selectedFile}
                          className={`btn-premium px-3 py-1 text-xs rounded-lg transition-all duration-200 flex items-center gap-2 ${
                            isRunning
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {isRunning ? <Square className="size-3" /> : <Play className="size-3" />}
                          {isRunning ? 'Stop' : 'Run'}
                        </button>
                      </div>
                    </div>

                    {/* Editor */}
                    <div className="flex-1 p-4">
                      <textarea
                        value={fileContent}
                        onChange={(e) => setFileContent(e.target.value)}
                        className="w-full h-full glass border border-border/30 rounded-lg p-4 text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder={selectedFile ? `Edit ${selectedFile}...` : 'Select a file to edit'}
                        disabled={!selectedFile}
                      />
                    </div>

                    {/* Terminal */}
                    <div className="h-48 border-t border-border/30 flex flex-col">
                      <div className="flex items-center justify-between p-2 border-b border-border/30">
                        <span className="text-sm font-medium text-foreground">Terminal</span>
                        <button
                          onClick={() => setTerminalOutput([])}
                          className="btn-premium px-2 py-1 text-xs glass border border-border/30 rounded hover:bg-accent/30 transition-all duration-200"
                        >
                          Clear
                        </button>
                      </div>
                      <div
                        ref={terminalRef}
                        className="flex-1 p-2 bg-black/50 overflow-y-auto font-mono text-xs"
                      >
                        {terminalOutput.map((line, index) => (
                          <div key={index} className="text-green-400">
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Preview */
                <div className="flex-1 p-4">
                  {previewUrl ? (
                    <iframe
                      src={previewUrl}
                      className={`w-full h-full border border-border/30 rounded-lg ${
                        responsiveMode ? 'max-w-sm mx-auto' : ''
                      } ${fullScreen ? 'fixed inset-0 z-50 max-w-none' : ''}`}
                      title="Preview"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full glass border border-border/30 rounded-lg">
                      <div className="text-center">
                        <Play className="size-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-medium text-foreground mb-2">No Preview Available</h3>
                        <p className="text-muted-foreground text-sm">
                          Run your development server to see the preview
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Context Menu */}
        {contextMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setContextMenu(null)}
            />
            <div
              className="fixed z-50 glass border border-border/30 rounded-lg shadow-premium-lg p-2 min-w-[150px]"
              style={{ left: contextMenu.x, top: contextMenu.y }}
            >
              <button
                onClick={handleCreateFile}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
              >
                <Plus className="size-4" />
                Create File
              </button>
              <button
                onClick={handleCreateFolder}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
              >
                <FolderPlus className="size-4" />
                Create Folder
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;