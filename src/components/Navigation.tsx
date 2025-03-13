import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Users, Mic2, Store, LogOut } from 'lucide-react';

export default function Navigation() {
  const { session, signOut } = useAuthStore();
  const navigate = useNavigate();

  if (!session) return null;

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="text-xl font-bold text-gray-800">
              ConferenceHub
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/speakerportal"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
              >
                <Mic2 size={20} />
                <span>Speakers</span>
              </Link>
              <Link
                to="/volunteermanagement"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
              >
                <Users size={20} />
                <span>Volunteers</span>
              </Link>
              <Link
                to="/vendormanagement"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
              >
                <Store size={20} />
                <span>Vendors</span>
              </Link>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-500"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}