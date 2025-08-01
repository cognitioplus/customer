import React from 'react';
import RecentNotes from '@/components/dashboard/RecentNotes';
import QuickSearch from '@/components/dashboard/QuickSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BookOpen, Tag } from 'lucide-react';

interface CustomerDashboardProps {
  notes: any[];
  onCreateNote: () => void;
  onOpenNote: (noteId: string) => void;
  onSearch: (query: string) => void;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  notes,
  onCreateNote,
  onOpenNote,
  onSearch,
}) => {
  const trendingTopics = [
    { name: 'React Hooks', count: 12 },
    { name: 'TypeScript', count: 8 },
    { name: 'UI Design', count: 6 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <QuickSearch onSearch={onSearch} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentNotes
            notes={notes.slice(0, 5)}
            onCreateNote={onCreateNote}
            onOpenNote={onOpenNote}
          />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <div key={topic.name} className="flex justify-between items-center">
                    <span className="text-sm">{topic.name}</span>
                    <span className="text-xs text-muted-foreground">{topic.count} notes</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Total Notes</span>
                  <span className="text-sm font-medium">{notes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">This Week</span>
                  <span className="text-sm font-medium">3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;