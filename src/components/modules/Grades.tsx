import React, { useState } from 'react';

interface GradesProps {
  userType: 'student' | 'mentor' | null;
}

const Grades: React.FC<GradesProps> = ({ userType }) => {
  const [grades, setGrades] = useState([
    { subject: 'Computer Networks', grade: 'A' },
    { subject: 'Software Project Management', grade: 'B+' },
    { subject: 'Operating Systems', grade: 'A-' },
    { subject: 'DBMS', grade: 'B' },
  ]);

  const [newGrade, setNewGrade] = useState({ subject: '', grade: '' });

  const handleAddGrade = () => {
    if (newGrade.subject && newGrade.grade) {
      setGrades([...grades, newGrade]);
      setNewGrade({ subject: '', grade: '' });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Student Grades</h3>
      <table className="w-full mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Subject</th>
            <th className="text-left p-2">Grade</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{grade.subject}</td>
              <td className="p-2">{grade.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {userType === 'mentor' && (
        <div>
          <h4 className="text-lg font-semibold mb-2">Add New Grade</h4>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Subject"
              value={newGrade.subject}
              onChange={(e) => setNewGrade({ ...newGrade, subject: e.target.value })}
              className="border p-2 rounded flex-1"
            />
            <input
              type="text"
              placeholder="Grade"
              value={newGrade.grade}
              onChange={(e) => setNewGrade({ ...newGrade, grade: e.target.value })}
              className="border p-2 rounded w-24"
            />
            <button
              onClick={handleAddGrade}
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

export default Grades;