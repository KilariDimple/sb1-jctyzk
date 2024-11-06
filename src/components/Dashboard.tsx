import React, { useState } from 'react';
import { Book, CheckSquare, DollarSign, FileText, Calendar, Users, UserPlus, PenTool } from 'lucide-react';
import StudentModule from './modules/StudentModule';
import Marks from './modules/Marks';
import Grades from './modules/Grades';
import Attendance from './modules/Attendance';
import FeePayment from './modules/FeePayment';
import LeaveApplication from './modules/LeaveApplication';
import ParentsModule from './modules/ParentsModule';
import AssignmentModule from './modules/AssignmentModule';
import StudentOverview from './modules/StudentOverview';
import FloatingChatBot from './FloatingChatBot';

interface DashboardProps {
  userType: 'student' | 'mentor' | 'faculty' | 'parent' | null;
}

const Dashboard: React.FC<DashboardProps> = ({ userType }) => {
  const [activeModule, setActiveModule] = useState('marks');

  const modules = [
    { id: 'marks', name: 'Marks', icon: Book, roles: ['student', 'parent'] },
    { id: 'grades', name: 'Grades', icon: CheckSquare, roles: ['student', 'parent'] },
    { id: 'attendance', name: 'Attendance', icon: FileText, roles: ['student', 'mentor', 'faculty', 'parent'] },
    { id: 'feePayment', name: 'Fee Payment', icon: DollarSign, roles: ['student', 'parent'] },
    { id: 'leaveApplication', name: 'Leave Application', icon: Calendar, roles: ['student', 'mentor'] },
    { id: 'assignments', name: 'Assignments', icon: PenTool, roles: ['faculty', 'student'] },
    { id: 'studentOverview', name: 'Student Overview', icon: Users, roles: ['mentor'] },
    { id: 'parentsModule', name: 'Parents Module', icon: UserPlus, roles: ['parent'] },
  ];

  const renderModule = () => {
    if (userType === 'student') {
      return <StudentModule userType="student" />;
    }

    switch (activeModule) {
      case 'marks':
        return userType === 'parent' ? <Marks userType={userType} /> : null;
      case 'grades':
        return userType === 'parent' ? <Grades userType={userType} /> : null;
      case 'attendance':
        return <Attendance userType={userType} />;
      case 'feePayment':
        return <FeePayment userType={userType} />;
      case 'leaveApplication':
        return <LeaveApplication userType={userType} />;
      case 'assignments':
        return <AssignmentModule userType={userType} />;
      case 'studentOverview':
        return <StudentOverview />;
      case 'parentsModule':
        return <ParentsModule />;
      default:
        return <div>Select a module</div>;
    }
  };

  return (
    <div className="flex relative min-h-screen">
      <aside className="w-64 bg-indigo-800 min-h-screen p-4">
        <nav>
          <ul>
            {modules.map((module) => {
              if (userType && module.roles.includes(userType)) {
                return (
                  <li key={module.id} className="mb-2">
                    <button
                      onClick={() => setActiveModule(module.id)}
                      className={`flex items-center w-full text-left px-4 py-2 rounded transition-colors duration-200 ${
                        activeModule === module.id
                          ? 'bg-indigo-600 text-white'
                          : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
                      }`}
                    >
                      <module.icon className="mr-2 h-5 w-5" />
                      {module.name}
                    </button>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4">
          {modules.find((m) => m.id === activeModule)?.name}
        </h2>
        {renderModule()}
      </main>
      {userType === 'student' && <FloatingChatBot />}
    </div>
  );
};

export default Dashboard;