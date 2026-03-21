import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}

interface EncryptedData {
  iv: string;
  data: string;
}

const IA_PAGE_PASSWORD = 'X7m#K9pL$2vQ5nW8@jR4cT7hY3eU0iO6pA1sD9fG2zH5bJ8kK3lL6mN0oO4bB7cV1xN8qQ3M6W2X9Z4vF7rC0tV5pB2lK8jH1mN4gF9dS6kJ3hG0fD7sA2wQ5eW8cR1yT4uP7iO0oI3uU6yY9zZ2xX5vV8bB1nN4mM7lL0kK3jJ6hH9gG2fD5dD8cC1xX4wW7vV0uU3tT6rR9eE2pP5iI8oO1uU4yY7wW0qQ3tT6eE9sS2dD5aA8pP1oO4iI7uU0hH3yY6wW9rR2qQ5tT8eE1sS4dD7aA0pP3oO6iI9uU2hH5yY8wW1rR4qQ7tT0eE3sS6dD9aA2pP5oO8';

const DEFAULT_SYSTEM_PROMPT = `Eres un profesor de programación experto y paciente. Estás ayudando a un estudiante que cursa el Grado Superior de Desarrollo de Aplicaciones Web (DAW) en el IOC Barcelona.

CONTEXTO IMPORTANTE:
- Los exámenes son EN PAPEL y DE MEMORIA (sin acceso a internet ni IDE)
- Debes enfocarte en ayudar a MEMORIZAR conceptos, sintaxis y estructuras
- Explica de forma clara y estructurada para poder escribirlo en un examen
- Usa listas, tablas y ejemplos cortos que sean fáciles de recordar
- Enfatiza errores comunes que se deben evitar

DATOS DEL ESTUDIANTE:
Nombre: Pablo Machado
Formación: CFGS DAW en IOC Barcelona (Marzo 2026 - Actualidad)
Bootcamp: Full Stack Web Developer en Migracode (+800 horas)

STACK TÉCNICO:
Frontend: React.js, JavaScript ES6+, HTML5, CSS3, Tailwind CSS, Vite, Webpack
Backend: Node.js, Express.js, APIs RESTful, JWT, Middleware
Bases de datos: MongoDB, MySQL, SQL, Mongoose
Herramientas: Git, GitHub, npm, Postman, Jest, Figma, Agile/Scrum

EXPERIENCIA:
- Pasante Front-end en Awaq.org (React, APIs RESTful)
- IT & AI Project Support en Formació y Treball
- Supervisor internacional en THG (inglés profesional)

PROYECTOS:
- App de Gestión de Biblioteca (React + Node.js + MongoDB)
- Portfolio personal (pablomachado.dev)

OBJETIVO: Ayúdame a preparar mis exámenes de DAW, enfocándote en lo que necesito saber de memoria para escribir en papel. Hazme preguntas para practicar y corrígeme si me equivoco.`;

// Funciones de cifrado
const getPasswordKey = async (password: string): Promise<CryptoKey> => {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', keyData);
  return crypto.subtle.importKey('raw', hash, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
};

const encryptData = async (data: unknown, password: string): Promise<EncryptedData> => {
  const key = await getPasswordKey(password);
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = encoder.encode(JSON.stringify(data));
  
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  );
  
  const encryptedArray = new Uint8Array(encrypted);
  let binary = '';
  for (let i = 0; i < encryptedArray.length; i++) {
    binary += String.fromCharCode(encryptedArray[i]);
  }
  
  return {
    iv: Array.from(iv).join(','),
    data: btoa(binary)
  };
};

const decryptData = async <T,>(encrypted: EncryptedData, password: string): Promise<T | null> => {
  try {
    const key = await getPasswordKey(password);
    const iv = new Uint8Array(encrypted.iv.split(',').map(Number));
    
    const binaryString = atob(encrypted.data);
    const data = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      data[i] = binaryString.charCodeAt(i);
    }
    
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(decrypted)) as T;
  } catch {
    return null;
  }
};

// Componente para renderizar contenido con syntax highlighting
const MessageContent: React.FC<{ content: string; fontSize?: number }> = ({ content, fontSize = 20 }) => {
  // Detectar bloques de código markdown: ```language\ncode\n```
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let keyIndex = 0;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Texto antes del bloque de código
    if (match.index > lastIndex) {
      const textBefore = content.slice(lastIndex, match.index);
      parts.push(
        <span key={keyIndex++} style={{ whiteSpace: 'pre-wrap' }}>
          {textBefore}
        </span>
      );
    }

    // Bloque de código
    const language = match[1] || 'javascript';
    const code = match[2].trim();
    
    parts.push(
      <div key={keyIndex++} style={{ margin: '12px 0', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ 
          backgroundColor: '#1e1e1e', 
          padding: '6px 12px', 
          fontSize: '12px', 
          color: '#858585',
          borderBottom: '1px solid #333'
        }}>
          {language}
        </div>
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: '20px',
            fontSize: `${fontSize}px`,
            lineHeight: '1.7',
            backgroundColor: '#0a0a0a',
            borderRadius: '0 0 8px 8px',
          }}
          codeTagProps={{
            style: {
              fontSize: `${fontSize}px`,
              lineHeight: '1.7',
              fontFamily: "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
            }
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            color: '#666',
            paddingRight: '20px',
            minWidth: '50px',
            fontSize: `${fontSize}px`,
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );

    lastIndex = match.index + match[0].length;
  }

  // Texto después del último bloque de código
  if (lastIndex < content.length) {
    const textAfter = content.slice(lastIndex);
    parts.push(
      <span key={keyIndex++} style={{ whiteSpace: 'pre-wrap' }}>
        {textAfter}
      </span>
    );
  }

  return <div style={{ ...styles.messageContent, fontSize: `${fontSize}px` }}>{parts.length > 0 ? parts : content}</div>;
};

const IAChat: NextPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [selectedModel, setSelectedModel] = useState('moonshot-v1-8k');
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(20);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Cargar tamaño de fuente guardado
  useEffect(() => {
    const savedFontSize = localStorage.getItem('ia_chat_font_size');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize, 10));
    }
  }, []);

  // Guardar tamaño de fuente cuando cambia
  useEffect(() => {
    localStorage.setItem('ia_chat_font_size', fontSize.toString());
  }, [fontSize]);

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 32));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  // Cargar mensajes cifrados al iniciar (solo después del login)
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const loadEncrypted = async () => {
      const saved = localStorage.getItem('ia_chat_encrypted');
      if (saved) {
        try {
          const encrypted: EncryptedData = JSON.parse(saved);
          const decrypted = await decryptData<Message[]>(encrypted, IA_PAGE_PASSWORD);
          if (decrypted) {
            setMessages(decrypted);
          } else {
            // Si no se puede descifrar (contraseña cambió), borrar
            localStorage.removeItem('ia_chat_encrypted');
          }
        } catch (e) {
          localStorage.removeItem('ia_chat_encrypted');
        }
      }
    };
    loadEncrypted();
  }, [isAuthenticated]);

  // Guardar mensajes cifrados cuando cambian
  useEffect(() => {
    if (!isAuthenticated || messages.length === 0) return;
    
    const saveEncrypted = async () => {
      const encrypted = await encryptData(messages, IA_PAGE_PASSWORD);
      localStorage.setItem('ia_chat_encrypted', JSON.stringify(encrypted));
    };
    saveEncrypted();
  }, [messages, isAuthenticated]);

  // Cargar system prompt
  useEffect(() => {
    const savedSystemPrompt = localStorage.getItem('ia_system_prompt');
    if (savedSystemPrompt) {
      setSystemPrompt(savedSystemPrompt);
    }
    
    const savedModel = localStorage.getItem('ia_selected_model');
    if (savedModel) {
      setSelectedModel(savedModel);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === IA_PAGE_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setMessages([]);
    setPassword('');
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const apiMessages = [] as Message[];
      
      if (systemPrompt.trim()) {
        apiMessages.push({
          role: 'system',
          content: systemPrompt.trim(),
        });
      }
      
      apiMessages.push(...newMessages.slice(-20));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages, model: selectedModel }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API error:', response.status, errorData);
        throw new Error(errorData.details || errorData.error || `Error ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: Date.now(),
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorText = error instanceof Error ? error.message : 'Error desconocido';
      const errorMessage: Message = {
        role: 'assistant',
        content: `Error: ${errorText}. Verifica que la API key esté configurada en Netlify.`,
        timestamp: Date.now(),
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  const exportToMarkdown = () => {
    const date = new Date().toISOString().split('T')[0];
    let mdContent = `# Chat con IA - ${date}\n\n`;
    
    if (systemPrompt.trim()) {
      mdContent += `## Prompt del Sistema\n\n${systemPrompt}\n\n---\n\n`;
    }
    
    mdContent += `## Conversación\n\n`;
    
    messages.forEach((msg) => {
      const time = msg.timestamp 
        ? new Date(msg.timestamp).toLocaleString('es-ES')
        : '';
      const role = msg.role === 'user' ? '**Yo**' : '**Kimi**';
      mdContent += `### ${role} (${time})\n\n${msg.content}\n\n---\n\n`;
    });

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-ia-${date}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearChat = () => {
    if (confirm('¿Borrar toda la conversación?')) {
      setMessages([]);
      localStorage.removeItem('ia_chat_encrypted');
    }
  };

  const saveSettings = () => {
    localStorage.setItem('ia_system_prompt', systemPrompt);
    localStorage.setItem('ia_selected_model', selectedModel);
    setShowSettings(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Acceso Restringido</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div style={styles.loginContainer}>
          <div style={styles.loginBox}>
            <div style={styles.lockIcon}>🔒</div>
            <form onSubmit={handleLogin} style={styles.loginForm}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña..."
                style={{
                  ...styles.passwordInput,
                  borderColor: passwordError ? '#f48771' : '#3c3c3c',
                }}
                autoFocus
              />
              {passwordError && (
                <p style={styles.errorText}>Contraseña incorrecta</p>
              )}
              <button type="submit" style={styles.loginButton}>
                Entrar
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>IA</title>
        <meta name="robots" content="noindex, nofollow" />
        <style>{`
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
          ::-webkit-scrollbar { width: 10px; height: 10px; }
          ::-webkit-scrollbar-track { background: #000000; }
          ::-webkit-scrollbar-thumb { background: #333; border-radius: 5px; }
          ::-webkit-scrollbar-thumb:hover { background: #444; }
        `}</style>
      </Head>
      <div style={styles.container}>
        {/* Controles integrados */}
        <div style={styles.controlsRow}>
          <div style={styles.controlsLeft}>
            <button onClick={() => setShowSettings(!showSettings)} style={styles.textBtn}>Config</button>
            <span style={styles.divider}>|</span>
            <button onClick={exportToMarkdown} style={styles.textBtn}>Exportar</button>
            <span style={styles.divider}>|</span>
            <button onClick={clearChat} style={styles.textBtn}>Limpiar</button>
            <span style={styles.divider}>|</span>
            <button onClick={handleLogout} style={styles.textBtn}>Salir</button>
          </div>
          <div style={styles.fontSizeControl}>
            <button onClick={decreaseFontSize} style={styles.fontSizeBtn} title="Reducir texto">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <span style={styles.fontSizeValue}>{fontSize}px</span>
            <button onClick={increaseFontSize} style={styles.fontSizeBtn} title="Aumentar texto">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div style={styles.settingsPanel}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ color: '#ffffff', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
                Modelo:
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '14px',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                <option value="moonshot-v1-8k">Moonshot v1 8k</option>
                <option value="kimi-k2-5">Kimi 2.5 Thinking</option>
              </select>
            </div>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="System prompt..."
              style={styles.systemPromptInput}
            />
            <button onClick={saveSettings} style={styles.saveButton}>
              Guardar
            </button>
          </div>
        )}

        {/* Messages */}
        <div style={styles.messagesContainer}>
          {messages.length === 0 && (
            <div style={styles.emptyState}>
              <p style={styles.emptyStateText}>Inicia la conversación</p>
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                ...(msg.role === 'user' ? styles.userMessage : styles.assistantMessage),
              }}
            >
              <div style={styles.messageHeader}>
                <span style={styles.messageRole}>
                  {msg.role === 'user' ? 'Tú' : 'Kimi'}
                </span>
                {msg.timestamp && (
                  <span style={styles.messageTime}>
                    {new Date(msg.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
              <MessageContent content={msg.content} fontSize={fontSize} />
            </div>
          ))}
          {isLoading && (
            <div style={{ ...styles.message, ...styles.assistantMessage }}>
              <div style={styles.loadingIndicator}>
                <span style={{ ...styles.loadingDot, ...styles.loadingDot1 }}></span>
                <span style={{ ...styles.loadingDot, ...styles.loadingDot2 }}></span>
                <span style={styles.loadingDot}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={styles.inputContainer}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Mensaje..."
            style={styles.input}
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            style={{
              ...styles.sendButton,
              opacity: !input.trim() || isLoading ? 0.4 : 1,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  // VS Code Dark Theme Colors
  loginContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    padding: '20px',
  },
  loginBox: {
    backgroundColor: '#000000',
    border: '1px solid #2a2a2a',
    borderRadius: '12px',
    padding: '40px',
    width: '100%',
    maxWidth: '360px',
  },
  lockIcon: {
    fontSize: '32px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  passwordInput: {
    padding: '12px 16px',
    fontSize: '16px',
    backgroundColor: '#000000',
    color: '#ffffff',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    outline: 'none',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  errorText: {
    color: '#ffffff',
    fontSize: '13px',
    margin: 0,
    textAlign: 'center',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  loginButton: {
    padding: '12px',
    fontSize: '14px',
    backgroundColor: '#0e639c',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    fontWeight: 500,
  },
  
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#000000',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  controlsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 16px',
    backgroundColor: '#000000',
  },
  controlsLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  textBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    fontSize: '15px',
    cursor: 'pointer',
    padding: '2px 6px',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    transition: 'color 0.2s',
  },
  divider: {
    color: '#ffffff',
    fontSize: '15px',
  },
  settingsPanel: {
    padding: '16px',
    backgroundColor: '#000000',
  },
  systemPromptInput: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '15px',
    backgroundColor: '#000000',
    color: '#ffffff',
    border: '1px solid #2a2a2a',
    borderRadius: '10px',
    resize: 'vertical',
    minHeight: '80px',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    boxSizing: 'border-box',
    lineHeight: '1.5',
  },
  saveButton: {
    marginTop: '12px',
    padding: '8px 16px',
    fontSize: '13px',
    backgroundColor: '#0e639c',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  emptyState: {
    textAlign: 'center',
    marginTop: '60px',
  },
  emptyStateText: {
    color: '#ffffff',
    fontSize: '18px',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  message: {
    maxWidth: '85%',
    padding: '16px 20px',
    borderRadius: '16px',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#000000',
    border: '1px solid #2a2a2a',
    color: '#ffffff',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#000000',
    border: '1px solid #2a2a2a',
    color: '#ffffff',
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '6px',
    fontSize: '12px',
  },
  messageRole: {
    fontWeight: 600,
    color: '#ffffff',
  },
  messageTime: {
    color: '#ffffff',
    fontSize: '11px',
  },
  messageContent: {
    lineHeight: '1.7',
    whiteSpace: 'pre-wrap',
    color: '#ffffff',
  },
  fontSizeControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#1a1a1a',
    borderRadius: '20px',
    padding: '4px 8px',
    border: '1px solid #333',
  },
  fontSizeBtn: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#0e639c',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    padding: 0,
  },
  fontSizeValue: {
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 500,
    minWidth: '40px',
    textAlign: 'center',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  loadingIndicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 16px',
    gap: '6px',
  },
  loadingDot: {
    width: '10px',
    height: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    animation: 'bounce 1.4s infinite ease-in-out both',
  },
  loadingDot1: {
    animationDelay: '-0.32s',
  },
  loadingDot2: {
    animationDelay: '-0.16s',
  },
  inputContainer: {
    display: 'flex',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: '#000000',
  },
  input: {
    flex: 1,
    padding: '14px 18px',
    fontSize: '16px',
    backgroundColor: '#000000',
    color: '#ffffff',
    border: '1px solid #2a2a2a',
    borderRadius: '20px',
    outline: 'none',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    resize: 'none',
    minHeight: '48px',
    maxHeight: '120px',
    lineHeight: '1.5',
  },
  sendButton: {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0e639c',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    padding: 0,
    flexShrink: 0,
  },
};

export default IAChat;
