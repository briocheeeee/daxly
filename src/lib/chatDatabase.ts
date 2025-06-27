import { supabase } from './supabase';

export interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  images?: string[];
}

export interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  chatUrl: string; // URL unique pour le chat
}

// Générer un ID unique pour les URLs de chat
export const generateChatId = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Créer un nouveau chat
export const createNewChat = async (
  userId: string,
  initialMessage: string,
  images?: string[]
): Promise<{ success: boolean; chatId?: string; error?: string }> => {
  try {
    const chatId = generateChatId();
    const title = initialMessage.slice(0, 50) + (initialMessage.length > 50 ? '...' : '');
    
    const firstMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      content: initialMessage,
      type: 'user',
      timestamp: new Date(),
      images
    };

    const { error } = await supabase
      .from('chats')
      .insert([
        {
          id: chatId,
          title,
          messages: [firstMessage],
          user_id: userId,
          chat_url: chatId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Error creating chat:', error);
      return { success: false, error: error.message };
    }

    return { success: true, chatId };
  } catch (error) {
    console.error('Error creating chat:', error);
    return { success: false, error: 'Failed to create chat' };
  }
};

// Récupérer un chat par son ID
export const getChatById = async (chatId: string): Promise<Chat | null> => {
  try {
    const { data, error } = await supabase
      .from('chats')
      .select('*')
      .eq('chat_url', chatId)
      .single();

    if (error || !data) {
      console.error('Error fetching chat:', error);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      messages: data.messages || [],
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      userId: data.user_id,
      chatUrl: data.chat_url
    };
  } catch (error) {
    console.error('Error fetching chat:', error);
    return null;
  }
};

// Récupérer tous les chats d'un utilisateur
export const getUserChats = async (userId: string): Promise<Chat[]> => {
  try {
    const { data, error } = await supabase
      .from('chats')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching user chats:', error);
      return [];
    }

    return data.map(chat => ({
      id: chat.id,
      title: chat.title,
      messages: chat.messages || [],
      createdAt: new Date(chat.created_at),
      updatedAt: new Date(chat.updated_at),
      userId: chat.user_id,
      chatUrl: chat.chat_url
    }));
  } catch (error) {
    console.error('Error fetching user chats:', error);
    return [];
  }
};

// Ajouter un message à un chat existant
export const addMessageToChat = async (
  chatId: string,
  message: ChatMessage
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Récupérer le chat actuel
    const { data: currentChat, error: fetchError } = await supabase
      .from('chats')
      .select('messages')
      .eq('chat_url', chatId)
      .single();

    if (fetchError || !currentChat) {
      return { success: false, error: 'Chat not found' };
    }

    const updatedMessages = [...(currentChat.messages || []), message];

    const { error } = await supabase
      .from('chats')
      .update({
        messages: updatedMessages,
        updated_at: new Date().toISOString()
      })
      .eq('chat_url', chatId);

    if (error) {
      console.error('Error adding message:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error adding message:', error);
    return { success: false, error: 'Failed to add message' };
  }
};

// Supprimer un chat
export const deleteChat = async (chatId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('chats')
      .delete()
      .eq('chat_url', chatId);

    if (error) {
      console.error('Error deleting chat:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting chat:', error);
    return { success: false, error: 'Failed to delete chat' };
  }
};