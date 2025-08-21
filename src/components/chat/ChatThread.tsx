'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/types/chat';

interface ChatThreadProps {
  links: Link[];
  onInputSubmit: (value: string) => void;
  hideInput?: boolean;
}

const ChatThread: React.FC<ChatThreadProps> = ({ 
  links, 
  onInputSubmit,
  hideInput = false 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [visibleLinks, setVisibleLinks] = useState<Link[]>([]);
  const [isInputActive, setIsInputActive] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reveal links one by one with a typing effect
  useEffect(() => {
    if ((isInputActive || hideInput) && visibleLinks.length < links.length) {
      setIsTyping(true);
      
      const timeout = setTimeout(() => {
        setVisibleLinks((prev) => [
          ...prev, 
          links[prev.length]
        ]);
        setIsTyping(false);
      }, 800); // Delay between messages appearing
      
      return () => clearTimeout(timeout);
    }
  }, [isInputActive, visibleLinks, links, hideInput]);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleLinks]);

  // If the input is hidden, automatically show all messages
  useEffect(() => {
    if (hideInput && links.length > 0 && visibleLinks.length === 0) {
      // Start showing the first message
      setVisibleLinks([links[0]]);
    }
  }, [hideInput, links, visibleLinks.length]);

  const handleInputFocus = () => {
    setIsInputActive(true);
    if (visibleLinks.length === 0) {
      // Show first link immediately on focus
      setVisibleLinks([links[0]]);
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onInputSubmit(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto w-full">
      {/* Chat messages container */}
      <div className={`flex-1 overflow-y-auto py-4 px-3 space-y-4 ${hideInput ? 'pb-0' : ''}`}>
        <AnimatePresence>
          {visibleLinks.map((link, index) => (
            <motion.div
              key={link.id}
              className={`flex ${link.isUser ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={`max-w-[85%] p-3 rounded-2xl ${
                  link.isUser
                    ? 'bg-primary-500 text-white rounded-br-none'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none'
                }`}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {link.url ? (
                  <a
                    href={link.url}
                    target={link.newTab ? "_blank" : "_self"}
                    rel={link.newTab ? "noopener noreferrer" : ""}
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <span className="font-display font-bold">{link.title}</span>
                    {link.description && (
                      <p className="text-sm opacity-90 mt-1">{link.description}</p>
                    )}
                  </a>
                ) : (
                  <>
                    <span className="font-display font-bold">{link.title}</span>
                    {link.description && (
                      <p className="text-sm opacity-90 mt-1">{link.description}</p>
                    )}
                  </>
                )}
              </motion.div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      {/* Input area - only shown when hideInput is false */}
      {!hideInput && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <form onSubmit={handleInputSubmit} className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={handleInputFocus}
              placeholder="Type something or click here..."
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
            />
            <button
              type="submit"
              className="bg-primary-500 text-white rounded-full p-2 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatThread; 