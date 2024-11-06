import React, { useState } from 'react';
import { MessageCircle, Bot, Send } from 'lucide-react';

const ChatBot: React.FC = () => {
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

    // Add user message
    const userMessage = { type: 'user' as const, content: query };
    
    // Generate bot response
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

  return (
    <div className="bg-white shadow-md rounded-lg p-6 h-[calc(100vh-16rem)] flex flex-col">
      <div className="flex items-center mb-6">
        <Bot className="w-6 h-6 text-indigo-600 mr-2" />
        <h3 className="text-xl font-semibold">Chat with Us</h3>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
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

      <form onSubmit={handleQuery} className="flex gap-2 mt-auto">
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
      </form>
    </div>
  );
};

export default ChatBot;