import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

interface AssistantProps {
  marks: Array<{ subject: string; marks: number }>;
}

const Assistant: React.FC<AssistantProps> = ({ marks }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [highlightedSubject, setHighlightedSubject] = useState<string | null>(null);

  const handleQuery = (e: React.FormEvent) => {
    e.preventDefault();
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('marks')) {
      const subject = marks.find(mark => 
        lowercaseQuery.includes(mark.subject.toLowerCase())
      );

      if (subject) {
        setResponse(`You got ${subject.marks} marks in ${subject.subject}.`);
        setHighlightedSubject(subject.subject);
        // Clear highlight after 3 seconds
        setTimeout(() => setHighlightedSubject(null), 3000);
      } else if (lowercaseQuery.includes('all') || lowercaseQuery.includes('show')) {
        const allMarks = marks.map(m => `${m.subject}: ${m.marks}`).join('\n');
        setResponse(`Here are all your marks:\n${allMarks}`);
        setHighlightedSubject('all');
        setTimeout(() => setHighlightedSubject(null), 3000);
      } else {
        setResponse("I couldn't find marks for that subject. Please check the subject name and try again.");
        setHighlightedSubject(null);
      }
    } else {
      setResponse("You can ask me about your marks in any subject. For example:\n- 'What are my marks in Mathematics?'\n- 'Show me all my marks'\n- 'How much did I score in Science?'");
      setHighlightedSubject(null);
    }
    
    setQuery('');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-6">
        <MessageCircle className="w-6 h-6 text-indigo-600 mr-2" />
        <h3 className="text-xl font-semibold">Academic Assistant</h3>
      </div>

      {/* Marks Display */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Your Marks</h4>
        <div className="grid grid-cols-2 gap-4">
          {marks.map((mark, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                highlightedSubject === mark.subject
                  ? 'bg-indigo-100 border-2 border-indigo-500'
                  : highlightedSubject === 'all'
                  ? 'bg-indigo-50'
                  : 'bg-gray-50'
              } transition-all duration-300`}
            >
              <div className="font-medium">{mark.subject}</div>
              <div className="text-2xl font-bold text-indigo-600">{mark.marks}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      {response && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-700 whitespace-pre-line">{response}</p>
        </div>
      )}

      <form onSubmit={handleQuery} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about your marks... (e.g., What are my marks in Mathematics?)"
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          Ask
        </button>
      </form>
    </div>
  );
};

export default Assistant;