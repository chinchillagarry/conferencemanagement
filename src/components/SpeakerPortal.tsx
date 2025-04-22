import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface SignUpSpeakerState {
  title: string;
  speaker_name: string;
  time_slot: string;
}

const SpeakerPortal: React.FC = () => {
  const [formData, setFormData] = useState<SignUpSpeakerState>({
    title: '',
    speaker_name: '',
    time_slot: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    const { error } = await supabase.from('presentations').insert([formData]);
    if (error) {
      console.error('Insert error:', error.message);
    } else {
      alert('Speaker info submitted successfully!');
      setFormData({ title: '', speaker_name: '', time_slot: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Speaker Portal</h1>
        <p className="text-gray-600">Manage your conference presentations here.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">New Presentation</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Speaker Name</label>
                <textarea
                  name="speaker_name"
                  value={formData.speaker_name}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Time Slot</label>
                <textarea
                  name="time_slot"
                  value={formData.time_slot}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerPortal;
