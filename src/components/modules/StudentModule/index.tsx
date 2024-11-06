import React, { useState } from 'react';
import { Book, MessageCircle } from 'lucide-react';
import Assistant from './Assistant';
import Marks from '../Marks';
import Grades from '../Grades';
import Attendance from '../Attendance';
import FeePayment from '../FeePayment';
import LeaveApplication from '../LeaveApplication';
import AssignmentModule from '../AssignmentModule';

interface StudentModuleProps {
  userType: 'student';
}

const StudentModule: React.FC<StudentModuleProps> = ({ userType }) => {
  const [activeTab, setActiveTab] = useState('marks');

  const marks = [
    { subject: 'Computer Networks', marks: 85 },
    { subject: 'Software Project Management', marks: 78 },
    { subject: 'Operating Systems', marks: 92 },
    { subject: 'DBMS', marks: 88 },
  ];

  const tabs = [
    { id: 'marks', name: 'Marks', icon: Book },
    { id: 'assistant', name: 'Academic Assistant', icon: MessageCircle },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'marks':
        return <Marks userType={userType} />;
      case 'assistant':
        return <Assistant marks={marks} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-5 h-5 mr-2" />
            {tab.name}
          </button>
        ))}
      </div>

      <div>{renderContent()}</div>
    </div>
  );
};

export default StudentModule;