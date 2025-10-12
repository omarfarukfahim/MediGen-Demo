
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getAiHealthResponse } from '../services/geminiService';
import { SendIcon } from '../components/icons/SendIcon';

const TypingIndicator: React.FC = () => (
  <div className="flex items-center space-x-1">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
  </div>
);

export const AiAssistantPage: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I'm your AI Health Assistant. How can I help you today? Please remember, I am an AI assistant and not a medical professional. The information I provide is for general guidance and educational purposes only. It should not be considered a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for any health concerns or before making any decisions related to your health."
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: userInput
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    const aiResponseText = await getAiHealthResponse(userInput);

    const aiMessage: ChatMessage = {
      id: Date.now() + 1,
      sender: 'ai',
      text: aiResponseText
    };

    setChatMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col h-[calc(100vh-12rem)]">
          <div className="p-4 border-b border-gray-200 text-center">
            <h1 className="text-xl font-bold text-gray-800">AI Health Assistant</h1>
            <p className="text-xs text-gray-500">For informational purposes only. Not medical advice.</p>
          </div>
          
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {chatMessages.map((message) => (
              <div 
                key={message.id} 
                className={`flex items-end gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-teal-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">AI</div>
                )}
                <div 
                  className={`max-w-[80%] p-3 rounded-xl ${
                    message.sender === 'user' 
                      ? 'bg-teal-700 text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-end gap-3 justify-start">
                 <div className="w-8 h-8 rounded-full bg-teal-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">AI</div>
                 <div className="max-w-[80%] p-3 rounded-xl bg-gray-100 text-gray-800 rounded-bl-none">
                    <TypingIndicator />
                 </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="relative">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask a health question..."
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-teal-700 text-white rounded-full flex items-center justify-center hover:bg-teal-800 disabled:bg-gray-400 transition-colors"
                aria-label="Send message"
              >
                <SendIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
