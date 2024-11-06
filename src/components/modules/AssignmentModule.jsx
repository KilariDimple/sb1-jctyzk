import React, { useState, useEffect } from 'react';

const AssignmentModule = ({ userType }) => {
  const [assignments, setAssignments] = useState([
    { id: 1, subject: 'Mathematics', title: 'Linear Algebra Problem Set', dueDate: '2023-06-01' },
    { id: 2, subject: 'Physics', title: 'Mechanics Lab Report', dueDate: '2023-06-05' }
  ]);

  const [newAssignment, setNewAssignment] = useState({
    subject: '',
    title: '',
    dueDate: ''
  });

  useEffect(() => {
    const storedAssignments = localStorage.getItem('assignments');
    if (storedAssignments) {
      setAssignments(JSON.parse(storedAssignments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments));
  }, [assignments]);

  const handleAddAssignment = (e) => {
    e.preventDefault();
    if (newAssignment.subject && newAssignment.title && newAssignment.dueDate) {
      setAssignments([
        ...assignments,
        { ...newAssignment, id: assignments.length + 1 }
      ]);
      setNewAssignment({ subject: '', title: '', dueDate: '' });
    }
  };

  return (
    <div className="space-y-8">
      {userType === 'faculty' && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Post Assignment</h3>
          <form onSubmit={handleAddAssignment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                value={newAssignment.subject}
                onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                value={newAssignment.dueDate}
                onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Post Assignment
            </button>
          </form>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Assignments</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Subject</th>
              <th className="text-left p-2">Title</th>
              <th className="text-left p-2">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id} className="border-b">
                <td className="p-2">{assignment.subject}</td>
                <td className="p-2">{assignment.title}</td>
                <td className="p-2">{assignment.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentModule;