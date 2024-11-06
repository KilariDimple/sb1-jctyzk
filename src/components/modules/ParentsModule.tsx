import React, { useState, useEffect } from 'react';
import { DollarSign, FileText, Book } from 'lucide-react';
import Marks from './Marks';
import Attendance from './Attendance';
import FeePayment from './FeePayment';

interface StudentActivity {
  id: number;
  type: 'attendance' | 'mark' | 'fee';
  date: string;
  details: string;
}

const ParentsModule: React.FC = () => {
  const [studentActivities, setStudentActivities] = useState<StudentActivity[]>([
    { id: 1, type: 'attendance', date: '2023-05-01', details: 'Present' },
    { id: 2, type: 'mark', date: '2023-05-02', details: 'Mathematics: 85/100' },
    { id: 3, type: 'fee', date: '2023-05-03', details: 'Tuition Fee: $500 paid' },
  ]);

  useEffect(() => {
    const storedActivities = localStorage.getItem('studentActivities');
    if (storedActivities) {
      setStudentActivities(JSON.parse(storedActivities));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('studentActivities', JSON.stringify(studentActivities));
  }, [studentActivities]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'attendance':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'mark':
        return <Book className="w-5 h-5 text-green-500" />;
      case 'fee':
        return <DollarSign className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Student Activities</h3>
        <div className="space-y-4">
          {studentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 border-b pb-2">
              {getActivityIcon(activity.type)}
              <div>
                <p className="font-semibold">{activity.date}</p>
                <p>{activity.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Marks userType="parent" />
      <Attendance userType="parent" />
      <FeePayment userType="parent" />
    </div>
  );
};

export default ParentsModule;