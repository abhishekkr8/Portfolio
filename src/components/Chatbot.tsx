import React, { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Send, Minimize2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';

// Simple local responses for demo purposes
const getLocalResponse = (message: string): string => {
  const msg = message.toLowerCase();
  
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return "Hello! Thanks for visiting my portfolio. I'm excited to connect with you!";
  }
  
  if (msg.includes('skill') || msg.includes('experience') || msg.includes('tech')) {
    return "I specialize in modern web development with React, TypeScript, and Node.js. I'm passionate about creating user-friendly applications and have experience with full-stack development.";
  }
  
  if (msg.includes('project') || msg.includes('work') || msg.includes('portfolio')) {
    return "I've worked on various projects ranging from e-commerce platforms to productivity apps. Each project showcases different aspects of my development skills. Feel free to check out the Projects section to see my work!";
  }
  
  if (msg.includes('contact') || msg.includes('hire') || msg.includes('available')) {
    return "I'm currently open to new opportunities! You can reach me through the contact form on this page, or connect with me on LinkedIn. I'd love to discuss how we can work together.";
  }
  
  if (msg.includes('about') || msg.includes('who') || msg.includes('background')) {
    return "I'm a passionate developer who loves creating innovative solutions. I enjoy working with modern technologies and am always eager to learn new skills. Check out the About section to learn more about my journey!";
  }
  
  // Default response
  return "Thanks for your message! I'm here to answer questions about my work, skills, and experience. You can also use the contact form to reach out to me directly.";
};

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m here to answer any questions about my work, experience, or projects. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate a brief delay for realistic feel
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const responseText = getLocalResponse(inputMessage);

      const assistantMessage: Message = {
        role: 'assistant',
        content: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      
      const fallbackMessage: Message = {
        role: 'assistant',
        content: "Thanks for your message! Please feel free to use the contact form to reach out to me directly.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-80 bg-background border rounded-lg shadow-xl z-50 transition-all duration-300 ${
      isMinimized ? 'h-14' : 'h-96'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b bg-primary text-primary-foreground rounded-t-lg">
        <h3 className="font-medium">Chat with Me</h3>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <Minimize2 className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 p-3 h-64 overflow-y-auto space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded-lg text-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground p-2 rounded-lg text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size="icon"
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;