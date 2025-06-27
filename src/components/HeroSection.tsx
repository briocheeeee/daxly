import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, ArrowUp, ChevronDown, Check, Brain, ChevronRight, X, Loader2, Image } from 'lucide-react';
import { createNewChat } from '../lib/chatDatabase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [inputValue, setInputValue] = useState('');
  const [backgroundText, setBackgroundText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showThinkingDropdown, setShowThinkingDropdown] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Claude 3.5 Haiku');
  const [maxMode, setMaxMode] = useState(true);
  const [thinkingLevel, setThinkingLevel] = useState('Medium');
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Array<{ file: File; url: string; id: string }>>([]);
  const [characterCount, setCharacterCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const MAX_IMAGES = 2;
  const MAX_CHARACTERS = 150;

  const suggestions = [
    'create a premium e-commerce platform with advanced analytics',
    'build a project management suite with real-time collaboration',
    'design a modern fintech dashboard with live market data',
    'develop an AI-powered content management system',
    'craft a luxury real estate platform with virtual tours',
    'build a comprehensive healthcare management system'
  ];

  // Enhanced typewriter effect with smoother transitions
  useEffect(() => {
    const currentSuggestion = suggestions[currentSuggestionIndex];
    
    const typeWriter = () => {
      if (!isDeleting) {
        if (currentCharIndex < currentSuggestion.length) {
          setBackgroundText(currentSuggestion.slice(0, currentCharIndex + 1));
          setCurrentCharIndex(prev => prev + 1);
          setIsTyping(true);
        } else {
          setIsTyping(false);
          setTimeout(() => {
            setIsDeleting(true);
          }, 3000);
          return;
        }
      } else {
        if (currentCharIndex > 0) {
          setBackgroundText(currentSuggestion.slice(0, currentCharIndex - 1));
          setCurrentCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentSuggestionIndex(prev => (prev + 1) % suggestions.length);
          setCurrentCharIndex(0);
          return;
        }
      }
    };

    const timer = setTimeout(typeWriter, isDeleting ? 20 : 35);
    return () => clearTimeout(timer);
  }, [currentCharIndex, isDeleting, currentSuggestionIndex, suggestions]);

  // Validate input characters
  const validateInput = (value: string) => {
    // Allow letters, numbers, spaces, and common special characters
    const allowedPattern = /^[a-zA-Z0-9\s\-_.,!?@#$%&*()+=\[\]{}|\\:";'<>\/~`^]*$/;
    return allowedPattern.test(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    // Check character limit
    if (value.length > MAX_CHARACTERS) {
      return;
    }
    
    // Validate characters
    if (!validateInput(value)) {
      return;
    }
    
    setInputValue(value);
    setCharacterCount(value.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (backgroundText.length <= MAX_CHARACTERS && validateInput(backgroundText)) {
        setInputValue(backgroundText);
        setCharacterCount(backgroundText.length);
      }
    } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTabClick = () => {
    if (backgroundText.length <= MAX_CHARACTERS && validateInput(backgroundText)) {
      setInputValue(backgroundText);
      setCharacterCount(backgroundText.length);
    }
  };

  const handleFileClick = () => {
    if (uploadedImages.length < MAX_IMAGES) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      if (uploadedImages.length < MAX_IMAGES && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        const id = Math.random().toString(36).substr(2, 9);
        
        setUploadedImages(prev => [...prev, { file, url, id }]);
      }
    });
    
    // Reset file input
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

  // Handle sending message and creating chat
  const handleSendMessage = async () => {
    if ((!inputValue.trim() && uploadedImages.length === 0) || isSubmitting) {
      return;
    }

    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }

    setIsSubmitting(true);

    try {
      // Convertir les images en URLs (dans un vrai projet, on les uploadrait)
      const imageUrls = uploadedImages.map(img => img.url);

      const result = await createNewChat(user.id, inputValue.trim(), imageUrls);

      if (result.success && result.chatId) {
        // Clear the form
        setInputValue('');
        setCharacterCount(0);
        
        // Clear images and cleanup URLs
        uploadedImages.forEach(img => URL.revokeObjectURL(img.url));
        setUploadedImages([]);
        
        // Navigate to the new chat
        navigate(`/${result.chatId}`);
      } else {
        console.error('Failed to create chat:', result.error);
        // Show error feedback (you could add a toast notification here)
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      uploadedImages.forEach(img => URL.revokeObjectURL(img.url));
    };
  }, []);

  const models = [
    {
      name: 'Claude 3.5 Haiku',
      type: 'Agentic',
      description: 'Advanced reasoning and code generation',
      selected: selectedModel === 'Claude 3.5 Haiku'
    },
    {
      name: 'Gemini 2.5 Flash',
      type: 'Flash',
      description: 'Ultra-fast responses with high quality',
      selected: selectedModel === 'Gemini 2.5 Flash'
    }
  ];

  const thinkingLevels = [
    { name: 'Low', description: 'Quick responses' },
    { name: 'Medium', description: 'Balanced thinking' },
    { name: 'Hard', description: 'Deep analysis' }
  ];

  const getDisplayType = () => {
    const model = models.find(m => m.selected);
    if (!model) return 'Agentic';
    
    if (model.name === 'Gemini 2.5 Flash') {
      return 'Flash';
    }
    return 'Agentic';
  };

  const canSend = (inputValue.trim() || uploadedImages.length > 0) && !isSubmitting;

  return (
    <div id="hero" className="text-foreground top-32 absolute z-10 w-full px-4 transition-opacity md:top-28 mb-20">
      <div className="max-w-4xl mx-auto">
        {/* Optimized Hero Title */}
        <div className="text-center mb-8">
          <h1 className="font-display relative text-[42px] md:text-[56px] lg:text-[68px] leading-[0.9] mb-6 text-shimmer">
            Make anything
          </h1>
          
          <div className="flex justify-center mb-8">
            <h2 className="font-body text-center text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Build fullstack web apps by prompting with our AI development platform
            </h2>
          </div>
        </div>

        {/* Optimized Input Section */}
        <div className="flex flex-col [view-transition-name:textarea] mb-20">
          <div className="glass-strong relative z-10 mx-auto cursor-text overflow-visible border border-border/30 focus-within:border-primary/40 focus-within:shadow-premium-xl focus-within:glow-primary rounded-2xl shadow-premium-xl mt-6 w-full transition-all duration-500 hover-lift-subtle border-gradient" data-textarea="true" style={{ maxWidth: '800px' }}>
            
            {/* Image Preview Section */}
            {uploadedImages.length > 0 && (
              <div className="flex flex-wrap gap-3 p-4 pb-2">
                {uploadedImages.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg border border-border/30 shadow-premium"
                    />
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-premium hover-lift"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-1 flex-col pb-1 pt-4 px-6 -mb-2">
              <div className="flex flex-wrap items-center gap-2"></div>
            </div>
            
            <div className="relative w-full flex flex-col rounded-2xl">
              <div className="relative">
                {/* Optimized background text */}
                <div 
                  className="absolute inset-0 pt-5 px-6 pb-6 text-lg text-muted-foreground/50 pointer-events-none whitespace-pre-wrap flex items-start font-body"
                  style={{ minHeight: '50px', maxHeight: '400px', height: '70px' }}
                >
                  <span className="flex-1">
                    {inputValue === '' ? backgroundText : ''}
                    {inputValue === '' && isTyping && (
                      <span className="animate-pulse ml-1 font-semibold text-primary rainbow-text">|</span>
                    )}
                  </span>
                  
                  {/* Optimized Tab button */}
                  {inputValue === '' && backgroundText && backgroundText.length <= MAX_CHARACTERS && (
                    <button
                      onClick={handleTabClick}
                      className="btn-premium ml-3 px-3 py-1.5 text-xs glass border border-border/50 rounded-lg hover:bg-accent/50 transition-all duration-300 flex items-center gap-2 font-medium shadow-premium hover-lift-subtle glow-accent"
                    >
                      <span>Tab</span>
                      <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                    </button>
                  )}
                </div>
                
                {/* Optimized input textarea */}
                <textarea 
                  className="font-body text-foreground outline-hidden placeholder:text-transparent focus:outline-hidden block w-full resize-none overflow-hidden pt-5 transition-all duration-300 rounded-2xl px-6 pb-6 text-lg bg-transparent relative z-10 focus-premium" 
                  placeholder=""
                  rows={1}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  disabled={isSubmitting}
                  id="daxly-input-box" 
                  style={{ minHeight: '50px', maxHeight: '400px', maxWidth: '800px', height: '70px', overflowY: 'hidden' }}
                />
              </div>
              
              {/* Character Counter */}
              <div className="px-6 pb-2">
                <div className="flex justify-end">
                  <span className={`text-xs font-medium transition-colors ${
                    characterCount > MAX_CHARACTERS * 0.9 
                      ? characterCount >= MAX_CHARACTERS 
                        ? 'text-red-500' 
                        : 'text-yellow-500'
                      : 'text-muted-foreground'
                  }`}>
                    {characterCount}/{MAX_CHARACTERS}
                  </span>
                </div>
              </div>
              
              {/* Optimized Controls */}
              <div className="flex items-center justify-between gap-3 px-4 pb-4">
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <button 
                    onClick={handleFileClick}
                    disabled={uploadedImages.length >= MAX_IMAGES || isSubmitting}
                    className={`btn-premium relative inline-flex items-center justify-center whitespace-nowrap transition-all duration-300 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 border border-border/40 glass hover:bg-accent/50 active:bg-accent px-3 text-foreground h-9 shrink-0 gap-2 rounded-lg text-sm font-medium shadow-premium hover-lift-subtle ${
                      uploadedImages.length >= MAX_IMAGES ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    data-state="closed"
                    title="Ajouter une image"
                  >
                    <Image className="size-4" />
                    <span className="hidden sm:inline">
                      Image {uploadedImages.length > 0 && `(${uploadedImages.length}/${MAX_IMAGES})`}
                    </span>
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Optimized Model Selector */}
                  <div className="p-0 relative">
                    <div className="flex h-9" type="button">
                      <button 
                        onClick={() => setShowDropdown(!showDropdown)}
                        disabled={isSubmitting}
                        className="btn-premium relative inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-300 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 border border-border/40 glass hover:bg-accent/50 active:bg-accent text-sm hover:text-foreground shrink-0 rounded-lg font-medium shadow-premium text-foreground h-9 px-4 hover-lift-subtle glow-primary" 
                        role="combobox" 
                        data-state="closed"
                      >
                        <div className="flex items-center truncate">
                          <span className="text-foreground flex items-center gap-2 font-medium">
                            <Brain className="size-4" />
                            {getDisplayType()}
                            {maxMode && <span className="rainbow-text text-xs font-bold">MAX</span>}
                          </span>
                        </div>
                        <ChevronDown className="size-3 opacity-50" />
                      </button>
                    </div>
                    
                    {/* Optimized Thinking Dropdown */}
                    {showThinkingDropdown && (
                      <>
                        <div 
                          className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm" 
                          onClick={() => setShowThinkingDropdown(false)}
                        ></div>
                        <div className="absolute top-full right-0 mt-2 glass-menu border border-border/30 rounded-xl shadow-premium-xl p-2 min-w-[180px] z-[110] menu-animate">
                          <div className="mb-2">
                            <h3 className="font-semibold text-xs text-foreground mb-2 px-2">Thinking Level</h3>
                          </div>
                          {thinkingLevels.map((level) => (
                            <div
                              key={level.name}
                              onClick={() => {
                                setThinkingLevel(level.name);
                                setShowThinkingDropdown(false);
                              }}
                              className="flex items-center justify-between px-3 py-2 text-sm cursor-pointer rounded-lg hover:bg-accent/30 transition-all duration-200 font-medium group"
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">{level.name}</span>
                                <span className="text-xs text-muted-foreground">{level.description}</span>
                              </div>
                              {thinkingLevel === level.name && (
                                <Check className="size-3 text-primary group-hover:scale-110 transition-transform" />
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    
                    {/* Optimized Main Dropdown Menu */}
                    {showDropdown && (
                      <>
                        <div 
                          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" 
                          onClick={() => setShowDropdown(false)}
                        ></div>
                        
                        <div className="absolute top-full mt-2 right-0 glass-menu border border-border/30 rounded-xl shadow-premium-xl p-3 min-w-[280px] z-50 menu-animate">
                          {/* Optimized MAX Mode Toggle */}
                          <div className="flex w-full items-center justify-between p-3 rounded-lg hover:bg-accent/20 transition-all duration-200 mb-2">
                            <div className="flex items-center gap-2 text-sm font-medium">
                              <span className="rainbow-text font-bold">MAX</span>
                              <span>mode</span>
                            </div>
                            <button 
                              onClick={() => setMaxMode(!maxMode)}
                              className={`inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all duration-300 shadow-premium ${
                                maxMode ? 'bg-primary glow-primary' : 'bg-input'
                              }`}
                            >
                              <span className={`bg-background pointer-events-none relative block h-5 w-5 rounded-full shadow-premium transition-transform duration-300 ${
                                maxMode ? 'translate-x-4' : 'translate-x-0'
                              }`}></span>
                            </button>
                          </div>
                          
                          {/* Optimized Thinking Level */}
                          <div className="flex w-full items-center justify-between gap-3 px-3 py-2 relative mb-2">
                            <div className="flex items-center gap-2">
                              <Brain className="size-4 text-muted-foreground" />
                              <span className="text-sm font-medium">Thinking</span>
                            </div>
                            <button 
                              onClick={() => setShowThinkingDropdown(!showThinkingDropdown)}
                              className="glass text-foreground flex items-center justify-between gap-2 border border-border/40 px-3 py-1.5 text-sm h-8 w-fit rounded-lg hover:bg-accent/50 transition-all duration-200 font-medium shadow-premium hover-lift-subtle"
                            >
                              <span className="truncate">{thinkingLevel}</span>
                              <ChevronDown className="size-3 shrink-0 opacity-50" />
                            </button>
                          </div>
                          
                          <div className="bg-border/20 -mx-3 h-px my-3"></div>
                          
                          {/* Optimized Model Options */}
                          <div className="space-y-1">
                            <h3 className="font-semibold text-xs text-foreground mb-2 px-2">AI Models</h3>
                            {models.map((model) => (
                              <div 
                                key={model.name}
                                onClick={() => {
                                  setSelectedModel(model.name);
                                  setShowDropdown(false);
                                }}
                                className="flex min-h-10 cursor-pointer items-center justify-between gap-3 text-sm relative select-none rounded-lg px-3 py-3 transition-all duration-200 hover:bg-accent/30 group border border-transparent hover:border-border/30"
                              >
                                <div className="flex items-center gap-2">
                                  <div className={`w-2.5 h-2.5 rounded-full ${model.selected ? 'bg-primary glow-primary' : 'bg-muted'} transition-all duration-200`}></div>
                                  <div className="flex flex-col">
                                    <span className="font-medium text-sm">{model.name}</span>
                                    <div className="text-muted-foreground flex items-center text-xs font-medium">
                                      <span>{model.type}</span>
                                      <span className="mx-1">•</span>
                                      <span>{model.description}</span>
                                      {maxMode && (
                                        <>
                                          <span className="mx-1">•</span>
                                          <span className="rainbow-text text-xs font-bold">MAX</span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <Check className={`size-4 text-primary transition-all duration-200 ${model.selected ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} group-hover:scale-110`} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Optimized Send Button */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleSendMessage}
                      disabled={!canSend}
                      className={`btn-premium relative inline-flex items-center justify-center gap-1 whitespace-nowrap text-sm focus-visible:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 border border-border/40 glass active:bg-accent disabled:text-muted-foreground shrink-0 rounded-lg transition-all duration-300 hover-lift disabled:bg-muted/50 disabled:opacity-50 size-9 shadow-premium ${
                        canSend 
                          ? 'hover:bg-primary hover:text-primary-foreground hover:border-primary/50 hover:glow-primary' 
                          : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <ArrowUp className="size-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;