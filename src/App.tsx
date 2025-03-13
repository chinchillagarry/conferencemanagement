import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { supabase } from './lib/supabase';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SpeakerPortal from './components/SpeakerPortal';
import VolunteerManagement from './components/VolunteerManagement';
import VendorManagement from './components/VendorManagement';
import AddVendor from './components/AddVendor';
import AddVolunteer from './components/AddVolunteer';

function App() {
  const { setSession, loading } = useAuthStore();

  useEffect(() => {
    // Set up auth listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/speakers" element={
              <ProtectedRoute>
                <SpeakerPortal />
              </ProtectedRoute>
            } />
            <Route path="/volunteers" element={
              <ProtectedRoute>
                <VolunteerManagement />
              </ProtectedRoute>
            } />

            <Route path="/addvendor" element={
              <ProtectedRoute>
                <AddVendor />
              </ProtectedRoute>
            } />

            <Route path="/addvolunteer" element={
              <ProtectedRoute>
                <AddVolunteer />
              </ProtectedRoute>
            } />
            


            <Route path="/vendors" element={
              <ProtectedRoute>
                <VendorManagement />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session } = useAuthStore();
  
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export default App;