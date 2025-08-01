import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNotes } from '@/hooks/useNotes';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import RecentNotes from '@/components/dashboard/RecentNotes';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import CustomerDashboard from '@/components/dashboard/CustomerDashboard';
import MentalHealthDashboard from '@/components/dashboard/MentalHealthDashboard';
import NoteEditor from '@/components/editor/NoteEditor';
import { toast } from '@/components/ui/use-toast';

const AppLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, login, signup, logout } = useAuth();
  const { notes, createNote, updateNote, searchNotes } = useNotes(user?.id);
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [currentNote, setCurrentNote] = useState<any>(null);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-muted/30">
        <div className="w-full max-w-md px-4">
          {authMode === 'login' ? (
            <LoginForm
              onLogin={login}
              onSwitchToSignup={() => setAuthMode('signup')}
            />
          ) : (
            <SignupForm
              onSignup={signup}
              onSwitchToLogin={() => setAuthMode('login')}
            />
          )}
        </div>
      </div>
    );
  }

  const handleCreateNote = () => {
    const newNote = createNote();
    setCurrentNote(newNote);
    setCurrentView('editor');
  };

  const handleOpenNote = (noteId: string) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      setCurrentNote(note);
      setCurrentView('editor');
    }
  };

  const handleSaveNote = (noteData: any) => {
    updateNote(noteData);
    if (currentNote && noteData.id === currentNote.id) {
      setCurrentNote({ ...currentNote, ...noteData });
    }
  };

  const handleSearch = (query: string) => {
    const results = searchNotes(query);
    toast({
      title: "Search Results",
      description: `Found ${results.length} notes matching "${query}"`,
    });
  };

  const mockFolders = [
    { id: '1', name: 'Work', count: 5 },
    { id: '2', name: 'Personal', count: 3 },
  ];

  const mockTags = [
    { name: 'important', count: 4 },
    { name: 'ideas', count: 2 },
  ];

  return (
    <div className="h-screen flex">
      {sidebarOpen && (
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          folders={mockFolders}
          tags={mockTags}
        />
      )}
      
      <div className="flex-1 flex flex-col">
        <Header
          user={user}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onSearch={handleSearch}
          onLogout={logout}
          onProfileClick={() => setCurrentView('profile')}
          onSettingsClick={() => setCurrentView('settings')}
        />
        
        <main className="flex-1 overflow-hidden">
          {currentView === 'dashboard' && (
            <>
              {user?.role === 'admin' && <AdminDashboard />}
              {user?.role === 'customer' && (
                <CustomerDashboard
                  notes={notes}
                  onCreateNote={handleCreateNote}
                  onOpenNote={handleOpenNote}
                  onSearch={handleSearch}
                />
              )}
              {user?.role === 'mental_health_professional' && <MentalHealthDashboard />}
            </>
          )}
          
          {currentView === 'editor' && currentNote && (
            <NoteEditor
              note={currentNote}
              onSave={handleSaveNote}
              onBack={() => setCurrentView('dashboard')}
            />
          )}
          
          {currentView === 'settings' && (
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-6">Settings</h1>
              <p className="text-muted-foreground">Settings panel coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
