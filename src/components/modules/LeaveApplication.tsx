import React, { useState } from 'react';

interface LeaveApplicationProps {
  userType: 'student' | 'mentor' | null;
}

interface LeaveApplication {
  id: number;
  studentId: string;
  studentName: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const LeaveApplication: React.FC<LeaveApplicationProps> = ({ userType }) => {
  const [leaveApplications, setLeaveApplications] = useState<LeaveApplication[]>([
    { id: 1, studentId: 'S001', studentName: 'John Doe', startDate: '2023-05-10', endDate: '2023-05-12', reason: 'Family function', status: 'Pending' },
    { id: 2, studentId: 'S002', studentName: 'Jane Smith', startDate: '2023-05-15', endDate: '2023-05-16', reason: 'Medical appointment', status: 'Approved' },
  ]);

  const [newApplication, setNewApplication] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newApplication.startDate && newApplication.endDate && newApplication.reason) {
      setLeaveApplications([
        ...leaveApplications,
        {
          id: leaveApplications.length + 1,
          studentId: 'S001', // In a real app, this would be the logged-in student's ID
          studentName: 'John Doe', // In a real app, this would be the logged-in student's name
          ...newApplication,
          status: 'Pending',
        },
      ]);
      setNewApplication({ startDate: '', endDate: '', reason: '' });
    }
  };

  const handleStatusChange = (id: number, newStatus: 'Approved' | 'Rejected') => {
    setLeaveApplications(
      leaveApplications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Leave Applications</h3>
      {userType === 'student' && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={newApplication.startDate}
                onChange={(e) => setNewApplication({ ...newApplication, startDate: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={newApplication.endDate}
                onChange={(e) => setNewApplication({ ...newApplication, endDate: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <textarea
              value={newApplication.reason}
              onChange={(e) => setNewApplication({ ...newApplication, reason: e.target.value })}
              className="w-full p-2 border rounded"
              rows={3}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit Application
          </button>
        </form>
      )}
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            {userType === 'mentor' && <th className="text-left p-2">Student</th>}
            <th className="text-left p-2">Start Date</th>
            <th className="text-left p-2">End Date</th>
            <th className="text-left p-2">Reason</th>
            <th className="text-left p-2">Status</th>
            {userType === 'mentor' && <th className="text-left p-2">Action</th>}
          </tr>
        </thead>
        <tbody>
          {leaveApplications.map((application) => (
            <tr key={application.id} className="border-b">
              {userType === 'mentor' && <td className="p-2">{application.studentName}</td>}
              <td className="p-2">{application.startDate}</td>
              <td className="p-2">{application.endDate}</td>
              <td className="p-2">{application.reason}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded ${
                    application.status === 'Approved'
                      ? 'bg-green-200 text-green-800'
                      : application.status === 'Rejected'
                      ? 'bg-red-200 text-red-800'
                      : 'bg-yellow-200 text-yellow-800'
                  }`}
                >
                  {application.status}
                </span>
              </td>
              {userType === 'mentor' && (
                <td className="p-2">
                  {application.status === 'Pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusChange(application.id, 'Approved')}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(application.id, 'Rejected')}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveApplication;