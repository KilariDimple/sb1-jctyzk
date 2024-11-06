import React, { useState } from 'react';
import { MessageCircle, Bot, Send, X } from 'lucide-react';

const FloatingChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot'; content: string }>>([
    { type: 'bot', content: "Hi! I'm your academic assistant. You can ask me about your marks, attendance, or any other academic queries!" }
  ]);

  const marks = [
    { subject: 'Mathematics', marks: 85 },
    { subject: 'Science', marks: 78 },
    { subject: 'English', marks: 92 },
    { subject: 'History', marks: 88 },
  ];

  const handleQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { type: 'user' as const, content: query };
    const lowercaseQuery = query.toLowerCase();
    let botResponse = { type: 'bot' as const, content: '' };

    if (lowercaseQuery.includes('marks')) {
      const subject = marks.find(mark => 
        lowercaseQuery.includes(mark.subject.toLowerCase())
      );

      if (subject) {
        botResponse.content = `You got ${subject.marks} marks in ${subject.subject}.`;
      } else if (lowercaseQuery.includes('all')) {
        const allMarks = marks.map(m => `${m.subject}: ${m.marks}`).join('\n');
        botResponse.content = `Here are all your marks:\n${allMarks}`;
      } else {
        botResponse.content = "I can help you check your marks. Try asking about a specific subject or 'all marks'.";
      }
    } else if (lowercaseQuery.includes('hello') || lowercaseQuery.includes('hi')) {
      botResponse.content = "Hello! How can I help you today?";
    } else if (lowercaseQuery.includes('help')) {
      botResponse.content = "I can help you with:\n- Checking your marks\n- Viewing attendance\n- Academic information\n\nTry asking something like 'What are my marks in Mathematics?' or 'Show all my marks'";
    } else {
      botResponse.content = "I'm not sure about that. You can ask me about your marks, attendance, or type 'help' to see what I can do.";
    }

    setMessages(prev => [...prev, userMessage, botResponse]);
    setQuery('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-xl z-50">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Bot className="w-6 h-6 text-indigo-600 mr-2" />
          <h3 className="text-lg font-semibold">Chat with Us</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleQuery} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default FloatingChatBot;