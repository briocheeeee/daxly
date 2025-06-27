import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Clock, User, LogIn, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getUserChats, deleteChat, getChatStats, type Chat } from '../lib/chatApi';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose }) => {
  const { user, loading } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loadingChats, setLoadingChats] = useState(false);
  const [stats, setStats] = useState({ totalChats: 0, totalMessages: 0 });

  // Load chats when panel opens and user is available
  useEffect(() => {
    if (isOpen && user && !loading) {
      loadChats();
      loadStats();
    }
  }, [isOpen, user, loading]);

  const loadChats = async () => {
    setLoadingChats(true);
    try {
      const userChats = await getUserChats(user?.id);
      setChats(userChats);
    } catch (error) {
      console.error('Error loading chats:', error);
    } finally {
      setLoadingChats(false);
    }
  };

  const loadStats = async () => {
    try {
      const chatStats = await getChatStats();
      setStats(chatStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (confirm('Are you sure you want to delete this chat?')) {
      const success = await deleteChat(chatId);
      if (success) {
        setChats(prev => prev.filter(chat => chat.id !== chatId));
        loadStats(); // Refresh stats
      }
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed left-0 top-0 h-full w-80 bg-background/95 backdrop-blur-xl border-r border-border/30 z-50 shadow-premium-xl transform transition-transform duration-300 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/30">
          <div>
            <h2 className="font-heading text-lg text-foreground">Chats</h2>
            {user && (
              <p className="text-xs text-muted-foreground">
                {stats.totalChats} chats • {stats.totalMessages} messages
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="btn-premium p-2 hover:bg-accent/50 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {!loading && (
            <>
              {user ? (
                <>
                  {/* New Chat Button */}
                  <button className="w-full mb-4 p-3 glass border border-border/30 rounded-xl hover:bg-accent/30 transition-all duration-300 flex items-center gap-3 shadow-premium hover-lift-subtle">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <MessageSquare className="size-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">New Chat</span>
                  </button>

                  {/* Chat List */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Recent Chats
                    </h3>
                    
                    {loadingChats ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      </div>
                    ) : chats.length > 0 ? (
                      chats.map((chat, index) => (
                        <div
                          key={chat.id}
                          className={`group p-3 rounded-xl cursor-pointer transition-all duration-200 border ${
                            index === 0
                              ? 'bg-primary/10 border-primary/30 shadow-premium'
                              : 'glass border-border/30 hover:bg-accent/30 hover-lift-subtle'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className={`font-medium text-sm truncate ${
                              index === 0 ? 'text-primary' : 'text-foreground'
                            }`}>
                              {chat.title}
                            </h4>
                            <div className="flex items-center gap-1">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                                <Clock className="size-3" />
                                <span>{formatTimeAgo(chat.updatedAt)}</span>
                              </div>
                              <button
                                onClick={(e) => handleDeleteChat(chat.id, e)}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all duration-200 text-muted-foreground hover:text-red-500"
                              >
                                <Trash2 className="size-3" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground truncate flex-1">
                              {chat.messages[0]?.content || 'No messages'}
                            </p>
                            <span className="text-xs text-muted-foreground ml-2">
                              {chat.messages.length} msg{chat.messages.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                          {chat.messages[0]?.images && chat.messages[0].images.length > 0 && (
                            <div className="flex items-center gap-1 mt-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-muted-foreground">
                                {chat.messages[0].images.length} image{chat.messages[0].images.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <MessageSquare className="size-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No chats yet</p>
                        <p className="text-xs text-muted-foreground">Start a conversation to see your chats here</p>
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="mt-6 p-3 glass border border-border/30 rounded-xl shadow-premium">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <User className="size-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">
                          {user.user_metadata?.username || user.email?.split('@')[0] || 'User'}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {chats.length} chat{chats.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Not Logged In State */
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-muted/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="size-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-heading text-lg text-foreground mb-2">
                    Start Your Journey
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    Don't have an account? Join thousands of developers building amazing apps with AI.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="/signup"
                      className="btn-premium w-full bg-primary text-primary-foreground py-3 px-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-premium hover-lift"
                    >
                      <LogIn className="size-4" />
                      Register
                    </a>
                    <a
                      href="/login"
                      className="btn-premium w-full glass border border-border/50 py-3 px-4 rounded-xl font-semibold text-foreground hover:bg-accent/30 transition-all duration-300 flex items-center justify-center gap-2 shadow-premium hover-lift-subtle"
                    >
                      Sign In
                    </a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatPanel;