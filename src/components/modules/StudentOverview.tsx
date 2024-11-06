import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  grade: string;
  marks: {
    subject: string;
    marks: number;
    grade: string;
  }[];
}

const StudentOverview: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const students: Student[] = [
    {
      id: 'S001',
      name: 'John Doe',
      grade: '10th',
      marks: [
        { subject: 'Computer Networks', marks: 85, grade: 'A' },
        { subject: 'Software Project Management', marks: 78, grade: 'B+' },
        { subject: 'Operating Systems', marks: 92, grade: 'A+' },
        { subject: 'DBMS', marks: 88, grade: 'A' },
      ],
    },
    {
      id: 'S002',
      name: 'Jane Smith',
      grade: '10th',
      marks: [
        { subject: 'Computer Networks', marks: 90, grade: 'A+' },
        { subject: 'Software Project Management', marks: 85, grade: 'A' },
        { subject: 'Operating Systems', marks: 88, grade: 'A' },
        { subject: 'DBMS', marks: 82, grade: 'A-' },
      ],
    },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateAverage = (marks: { marks: number }[]) => {
    const total = marks.reduce((sum, mark) => sum + mark.marks, 0);
    return (total / marks.length).toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search students by name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Student List */}
        <div className="md:col-span-1 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Students</h3>
          <div className="space-y-2">
            {filteredStudents.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedStudent?.id === student.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="font-medium">{student.name}</div>
                <div className="text-sm text-gray-500">ID: {student.id}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Student Details */}
        {selectedStudent ? (
          <div className="md:col-span-2 space-y-6">
            {/* Overview Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold">{selectedStudent.name}</h3>
                  <p className="text-gray-500">Student ID: {selectedStudent.id}</p>
                  <p className="text-gray-500">Grade: {selectedStudent.grade}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">Average Score</div>
                  <div className="text-3xl font-bold text-indigo-600">
                    {calculateAverage(selectedStudent.marks)}%
                  </div>
                </div>
              </div>

              {/* Marks and Grades Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">Subject</th>
                      <th className="px-4 py-2 text-left">Marks</th>
                      <th className="px-4 py-2 text-left">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStudent.marks.map((mark, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{mark.subject}</td>
                        <td className="px-4 py-2">{mark.marks}</td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {mark.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6 flex items-center justify-center text-gray-500">
            Select a student to view their details
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentOverview;