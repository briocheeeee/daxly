// Configuration de l'API Claude 3.5 Haiku
const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClaudeResponse {
  content: Array<{
    type: 'text';
    text: string;
  }>;
  id: string;
  model: string;
  role: 'assistant';
  stop_reason: string;
  stop_sequence: null;
  type: 'message';
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

// Envoyer un message à Claude 3.5 Haiku
export const sendMessageToClaude = async (
  messages: ClaudeMessage[],
  systemPrompt?: string
): Promise<{ success: boolean; response?: string; error?: string }> => {
  try {
    if (!CLAUDE_API_KEY) {
      console.warn('Claude API key not configured. Please add VITE_CLAUDE_API_KEY to your environment variables.');
      return { success: false, error: 'Claude API key not configured' };
    }

    const requestBody = {
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 4096,
      temperature: 0.7,
      system: systemPrompt || 'You are a helpful AI coding assistant. Help users create and improve their code projects.',
      messages: messages
    };

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Claude API error:', errorData);
      return { success: false, error: `Claude API error: ${response.status}` };
    }

    const data: ClaudeResponse = await response.json();
    
    if (data.content && data.content.length > 0) {
      return { success: true, response: data.content[0].text };
    } else {
      return { success: false, error: 'No response content from Claude' };
    }
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return { success: false, error: 'Failed to call Claude API' };
  }
};

// Générer du code avec Claude
export const generateCodeWithClaude = async (
  prompt: string,
  context?: string
): Promise<{ success: boolean; code?: string; explanation?: string; error?: string }> => {
  const systemPrompt = `You are an expert web developer and coding assistant. When asked to create or modify code:

1. Generate clean, modern, and well-structured code
2. Use best practices and current standards
3. Include helpful comments when necessary
4. Provide a brief explanation of what the code does
5. If creating a web application, use modern frameworks like React, Vue, or vanilla JavaScript
6. For styling, prefer Tailwind CSS or modern CSS techniques

Format your response as:
\`\`\`[language]
[code here]
\`\`\`

Then provide a brief explanation of the code.`;

  const messages: ClaudeMessage[] = [
    {
      role: 'user',
      content: context ? `Context: ${context}\n\nRequest: ${prompt}` : prompt
    }
  ];

  const result = await sendMessageToClaude(messages, systemPrompt);
  
  if (result.success && result.response) {
    // Extraire le code et l'explication
    const codeMatch = result.response.match(/```[\w]*\n([\s\S]*?)\n```/);
    const code = codeMatch ? codeMatch[1] : '';
    
    // L'explication est le texte après le bloc de code
    const explanation = result.response.replace(/```[\w]*\n[\s\S]*?\n```/, '').trim();
    
    return {
      success: true,
      code,
      explanation: explanation || result.response
    };
  }
  
  return result;
};