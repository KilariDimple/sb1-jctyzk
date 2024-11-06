import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const MarksBot = ({ marks }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleQuery = (e) => {
    e.preventDefault();
    const lowercaseQuery = query.toLowerCase();
    
    // Check if query contains "marks" and a subject
    if (lowercaseQuery.includes('marks')) {
      const subject = marks.find(mark => 
        lowercaseQuery.includes(mark.subject.toLowerCase())
      );

      if (subject) {
        setResponse(`You got ${subject.marks} marks in ${subject.subject}.`);
      } else {
        setResponse("I couldn't find marks for that subject. Please check the subject name and try again.");
      }
    } else {
      setResponse("You can ask me about your marks in any subject. For example, 'What are my marks in Mathematics?'");
    }
    
    setQuery('');
  };

  return (
    <div className="mt-6 border-t pt-4">
      <div className="flex items-center mb-4">
        <MessageCircle className="w-5 h-5 text-indigo-600 mr-2" />
        <h4 className="text-lg font-semibold">Marks Assistant</h4>
      </div>
      
      {response && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-gray-700">{response}</p>
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
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Ask
        </button>
      </form>
    </div>
  );
};

export default MarksBot;