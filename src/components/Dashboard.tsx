import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Calendar, Users, Store, Mic2 } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuthStore();

  const stats = [
    { title: 'Upcoming Presentations', count: 12, icon: Calendar },
    { title: 'Active Volunteers', count: 24, icon: Users },
    { title: 'Registered Vendors', count: 18, icon: Store },
    { title: 'Total Speakers', count: 15, icon: Mic2 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome back{user?.email ? `, ${user.email.split('@')[0]}!` : '!'}
        </h1>
        <p className="text-gray-600">
          Here's what's happening at the conference today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4"
            >
              <div className="bg-blue-100 rounded-full p-3">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.count}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-gray-800">New presentation uploaded</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-gray-800">Volunteer task completed</p>
              <p className="text-sm text-gray-500">4 hours ago</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="text-gray-800">New vendor registration</p>
              <p className="text-sm text-gray-500">6 hours ago</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
              Upload Presentation
            </button>
            <button className="p-4 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors">
              Assign Task
            </button>
            <button className="p-4 bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors">
              Add Vendor
            </button>
            <button className="p-4 bg-orange-50 rounded-lg text-orange-700 hover:bg-orange-100 transition-colors">
              View Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}