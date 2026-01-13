
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, User, Bot, Sparkles, Languages, Info, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const TutorPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bonjour ! Je suis votre tuteur de français personnel. Comment puis-je vous aider aujourd\'hui ? Vous pouvez me poser des questions sur la grammaire, le vocabulaire ou simplement pratiquer la conversation.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are a professional and friendly French language tutor named 'Marc'. 
          Your goals:
          1. Help the student learn French.
          2. Primarily respond in French, but if the user seems lost or asks for translations, provide them in English.
          3. Correct minor grammatical mistakes gently.
          4. Keep responses encouraging and educational.
          5. Use formatting like bullet points or bold text to emphasize important grammar rules.`,
        },
      });

      // Simple context management (last 6 messages)
      const response = await chat.sendMessage({ 
        message: userMessage 
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || 'Désolé, j\'ai eu un petit problème technique.' }]);
    } catch (error) {
      console.error('Error with Gemini:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Une erreur s\'est produite. Veuillez réessayer plus tard.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col h-[calc(100vh-160px)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Sparkles className="text-blue-600" />
            Tuteur IA Interactif
          </h1>
          <p className="text-slate-500">Pratiquez votre français avec Marc, notre IA experte.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          MARC EST EN LIGNE
        </div>
      </div>

      <div className="flex-grow bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden mb-6">
        {/* Messages Container */}
        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-6 space-y-6 scroll-smooth"
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-100 border border-slate-200'
                }`}>
                  {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-blue-600" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <Bot size={16} className="text-blue-600" />
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100">
                  <Loader2 className="animate-spin text-blue-600" size={18} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <div className="relative flex items-center gap-3">
            <input 
              type="text"
              placeholder="Écrivez votre message ici..."
              className="flex-grow bg-white border border-slate-200 rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2 rounded-lg transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-400 font-medium uppercase tracking-wider px-2">
            <span className="flex items-center gap-1"><Languages size={12} /> Français/Anglais</span>
            <span className="flex items-center gap-1"><Info size={12} /> Aide pédagogique</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorPage;
