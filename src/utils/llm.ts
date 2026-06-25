import type { Provider } from '../components/SettingsModal';

export interface GenerateParams {
  systemPrompt: string;
  userPrompt: string;
  onChunk: (text: string) => void;
  onComplete: () => void;
  onError: (error: string) => void;
  isAuthenticated?: boolean;
  onRequestLogin?: () => void;
  providerOverride?: string;
  modelOverride?: string;
}

export const generateStream = async ({
  systemPrompt,
  userPrompt,
  onChunk,
  onComplete,
  onError,
  isAuthenticated,
  onRequestLogin,
  providerOverride,
  modelOverride
}: GenerateParams) => {
  const savedKeys = localStorage.getItem('kontxt_api_keys');
  const provider = (providerOverride || localStorage.getItem('kontxt_provider') || 'Groq') as Provider;
  
  const defaultModels: Record<string, string> = {
    'Groq': 'llama3-70b-8192',
    'OpenAI': 'gpt-4o',
    'Google': 'gemini-1.5-pro',
    'OpenRouter': 'anthropic/claude-3-opus',
    'Together': 'meta-llama/Llama-3-70b-chat-hf',
    'Mistral': 'mistral-large-latest',
    'DeepSeek': 'deepseek-chat',
  };
  const model = modelOverride || localStorage.getItem('kontxt_model') || defaultModels[provider] || '';

  let apiKeys: Record<Provider, string> = { 
    OpenAI: '', Google: '', Groq: '', OpenRouter: '', Together: '', Mistral: '', DeepSeek: '' 
  };
  if (savedKeys) {
    try {
      apiKeys = JSON.parse(savedKeys);
    } catch {
      // ignore
    }
  }

  const fallbackKeys: Record<string, string | undefined> = {
    OpenAI: import.meta.env.VITE_DEFAULT_OPENAI_KEY,
    Google: import.meta.env.VITE_DEFAULT_GEMINI_KEY,
    Groq: import.meta.env.VITE_DEFAULT_GROQ_KEY,
    OpenRouter: import.meta.env.VITE_DEFAULT_OPENROUTER_KEY,
    Together: import.meta.env.VITE_DEFAULT_TOGETHER_KEY,
    Mistral: import.meta.env.VITE_DEFAULT_MISTRAL_KEY,
    DeepSeek: import.meta.env.VITE_DEFAULT_DEEPSEEK_KEY,
  };

  const userKey = apiKeys[provider];
  const apiKey = userKey || fallbackKeys[provider];

  if (!userKey && !isAuthenticated) {
    if (onRequestLogin) onRequestLogin();
    onError('Authentication required: Please sign in to use the default Kontxt AI key, or provide your own API key in Settings.');
    return;
  }

  if (!apiKey) {
    onError(`Missing API key for ${provider}. Please add it in Settings > AI Configuration.`);
    return;
  }
  if (!model) {
    onError(`No model selected for ${provider}. Please select one in Settings > AI Configuration.`);
    return;
  }

  try {
    const openAiCompatibles: Provider[] = ['OpenAI', 'Groq', 'OpenRouter', 'Together', 'Mistral', 'DeepSeek'];
    
    if (openAiCompatibles.includes(provider)) {
      await generateOpenAIFormat(provider, apiKey, model, systemPrompt, userPrompt, onChunk);
    } else if (provider === 'Google') {
      await generateGemini(apiKey, model, systemPrompt, userPrompt, onChunk);
    }
    onComplete();
  } catch (error: unknown) {
    onError(error instanceof Error ? error.message : 'An unknown error occurred during generation.');
  }
};

const generateOpenAIFormat = async (
  provider: Provider,
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string,
  onChunk: (text: string) => void
) => {
  const endpoints: Record<string, string> = {
    'OpenAI': 'https://api.openai.com/v1/chat/completions',
    'Groq': 'https://api.groq.com/openai/v1/chat/completions',
    'OpenRouter': 'https://openrouter.ai/api/v1/chat/completions',
    'Together': 'https://api.together.xyz/v1/chat/completions',
    'Mistral': 'https://api.mistral.ai/v1/chat/completions',
    'DeepSeek': 'https://api.deepseek.com/chat/completions'
  };

  const endpoint = endpoints[provider] || endpoints['OpenAI'];

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  if (provider === 'OpenRouter') {
    headers['HTTP-Referer'] = window.location.origin;
    headers['X-Title'] = 'Kontxt';
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      stream: true,
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    let msg = err.error?.message || `HTTP ${response.status}`;
    if (response.status === 401) {
      msg = 'Invalid or expired API Key. Please verify your key in Settings.';
    } else if (response.status === 429) {
      msg = 'Rate limit exceeded or insufficient quota. Please check your account limits.';
    }
    throw new Error(msg);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder('utf-8');

  if (!reader) throw new Error('No response body');

  let buffer = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ') && line !== 'data: [DONE]') {
        try {
          const data = JSON.parse(line.slice(6));
          const content = data.choices?.[0]?.delta?.content;
          if (content) {
            onChunk(content);
          }
        } catch {
          // ignore
        }
      }
    }
  }
};

const generateGemini = async (
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string,
  onChunk: (text: string) => void
) => {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}&alt=sse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }]
        }
      ]
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    let msg = err.error?.message || `HTTP ${response.status}`;
    if (response.status === 400 && msg.includes('API key not valid')) {
      msg = 'Invalid or expired API Key. Please verify your key in Settings.';
    } else if (response.status === 429) {
      msg = 'Rate limit exceeded or insufficient quota. Please check your account limits.';
    }
    throw new Error(msg);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder('utf-8');
  if (!reader) throw new Error('No response body');

  let buffer = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6));
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            onChunk(text);
          }
        } catch {
          // ignore
        }
      }
    }
  }
};
