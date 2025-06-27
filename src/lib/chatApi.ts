// Simple in-memory chat storage (in a real app, this would be a database)
let chatStorage: Chat[] = [];
let chatCounter = 1;

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
}

export interface Message {
  id: string;
  content: string;
  images?: string[];
  timestamp: Date;
  type: 'user' | 'assistant';
}

export interface CreateChatRequest {
  message: string;
  images?: File[];
  userId?: string;
}

export interface CreateChatResponse {
  success: boolean;
  chat?: Chat;
  error?: string;
}

// Create a new chat
export const createChat = async (request: CreateChatRequest): Promise<CreateChatResponse> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Process images (in a real app, you'd upload to storage)
    const imageUrls: string[] = [];
    if (request.images) {
      for (const image of request.images) {
        // In a real app, upload to cloud storage and get URL
        const url = URL.createObjectURL(image);
        imageUrls.push(url);
      }
    }

    // Create the chat
    const chat: Chat = {
      id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: `Chat ${chatCounter}`,
      messages: [
        {
          id: `msg_${Date.now()}`,
          content: request.message,
          images: imageUrls.length > 0 ? imageUrls : undefined,
          timestamp: new Date(),
          type: 'user'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: request.userId
    };

    // Store the chat
    chatStorage.push(chat);
    chatCounter++;

    console.log('Chat created:', chat);
    console.log('Total chats:', chatStorage.length);

    return {
      success: true,
      chat
    };
  } catch (error) {
    console.error('Error creating chat:', error);
    return {
      success: false,
      error: 'Failed to create chat'
    };
  }
};

// Get all chats for a user
export const getUserChats = async (userId?: string): Promise<Chat[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    // Filter chats by user (if userId provided) or return all
    const userChats = userId 
      ? chatStorage.filter(chat => chat.userId === userId)
      : chatStorage;

    // Sort by most recent first
    return userChats.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  } catch (error) {
    console.error('Error fetching chats:', error);
    return [];
  }
};

// Get a specific chat by ID
export const getChatById = async (chatId: string): Promise<Chat | null> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    return chatStorage.find(chat => chat.id === chatId) || null;
  } catch (error) {
    console.error('Error fetching chat:', error);
    return null;
  }
};

// Delete a chat
export const deleteChat = async (chatId: string): Promise<boolean> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = chatStorage.findIndex(chat => chat.id === chatId);
    if (index !== -1) {
      chatStorage.splice(index, 1);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting chat:', error);
    return false;
  }
};

// Add a message to an existing chat
export const addMessageToChat = async (
  chatId: string, 
  message: string, 
  type: 'user' | 'assistant' = 'user',
  images?: string[]
): Promise<boolean> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const chat = chatStorage.find(c => c.id === chatId);
    if (!chat) return false;

    const newMessage: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content: message,
      images,
      timestamp: new Date(),
      type
    };

    chat.messages.push(newMessage);
    chat.updatedAt = new Date();

    return true;
  } catch (error) {
    console.error('Error adding message:', error);
    return false;
  }
};

// Get chat statistics
export const getChatStats = async (): Promise<{ totalChats: number; totalMessages: number }> => {
  try {
    const totalChats = chatStorage.length;
    const totalMessages = chatStorage.reduce((sum, chat) => sum + chat.messages.length, 0);
    
    return { totalChats, totalMessages };
  } catch (error) {
    console.error('Error getting stats:', error);
    return { totalChats: 0, totalMessages: 0 };
  }
};