import React, { useState } from 'react';
import { Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VolunteerManagement() {
  const [selectedArea, setSelectedArea] = useState('all');

  const areas = ['Registration', 'Technical Support', 'Hospitality', 'Security'];
  
  const volunteers = [
    {
      id: 1,
      name: 'John Doe',
      area: 'Registration',
      status: 'active',
      tasks: [
        { id: 1, title: 'Morning Check-in', status: 'completed' },
        { id: 2, title: 'Badge Distribution', status: 'in_progress' },
      ],
    },
    // Add more mock data as needed
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Volunteer Management
        </h1>
        <p className="text-gray-600">
          Manage volunteers and their assigned tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Areas</h2>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedArea('all')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  selectedArea === 'all'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                All Areas
              </button>
              {areas.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    selectedArea === area
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Volunteers</h2>
             
             <Link to = "/addvolunteer"> 
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Add Volunteer</span>
              </button>
              </Link>
            </div>

            <div className="space-y-4">
              {volunteers.map((volunteer) => (
                <div
                  key={volunteer.id}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {volunteer.name}
                      </h3>
                      <p className="text-sm text-gray-500">{volunteer.area}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        volunteer.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {volunteer.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {volunteer.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                      >
                        <div className="flex items-center space-x-3">
                          {task.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : task.status === 'in_progress' ? (
                            <Clock className="h-5 w-5 text-yellow-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                          <span className="text-gray-700">{task.title}</span>
                        </div>
                        <span
                          className={`text-sm ${
                            task.status === 'completed'
                              ? 'text-green-600'
                              : task.status === 'in_progress'
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}