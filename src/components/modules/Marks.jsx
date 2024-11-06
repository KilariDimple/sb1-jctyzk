import React, { useState, useEffect } from 'react';

const Marks = ({ userType }) => {
  const [marks, setMarks] = useState([
    { subject: 'Mathematics', marks: 85 },
    { subject: 'Science', marks: 78 },
    { subject: 'English', marks: 92 },
    { subject: 'History', marks: 88 },
  ]);

  const [newMark, setNewMark] = useState({ subject: '', marks: '' });

  useEffect(() => {
    const storedMarks = localStorage.getItem('marks');
    if (storedMarks) {
      setMarks(JSON.parse(storedMarks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('marks', JSON.stringify(marks));
  }, [marks]);

  const handleAddMark = () => {
    if (newMark.subject && newMark.marks) {
      setMarks([...marks, { ...newMark, marks: parseInt(newMark.marks) }]);
      setNewMark({ subject: '', marks: '' });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Student Marks</h3>
      <table className="w-full mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Subject</th>
            <th className="text-left p-2">Marks</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((mark, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{mark.subject}</td>
              <td className="p-2">{mark.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {(userType === 'mentor' || userType === 'faculty') && (
        <div>
          <h4 className="text-lg font-semibold mb-2">Add New Mark</h4>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Subject"
              value={newMark.subject}
              onChange={(e) => setNewMark({ ...newMark, subject: e.target.value })}
              className="border p-2 rounded flex-1"
            />
            <input
              type="number"
              placeholder="Marks"
              value={newMark.marks}
              onChange={(e) => setNewMark({ ...newMark, marks: e.target.value })}
              className="border p-2 rounded w-24"
            />
            <button
              onClick={handleAddMark}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marks;