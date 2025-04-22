import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';


export default function ScheduleManagment(){

    const [presentations, setPresentations] = useState<any[]>([]);

    const fetchPresentations = async () => {
    const { data } = await supabase.from('presentations').select('*');
    setPresentations(data || []);
  };

  useEffect(() => {
    fetchPresentations();
  }, []);

    return (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Schedule Management</h1>
            <p className="text-gray-600">Manage the speaker schedule</p>
          </div>
    
          <div className="bg-white rounded-lg shadow-md p-6">
           
    
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Speaker Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Presentation Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time Slot
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  
                {presentations.map((presentation, index) => (
                    <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {presentation.speaker_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {presentation.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {presentation.time_slot}
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>
    );

}