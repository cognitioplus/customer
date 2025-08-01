import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

interface RecentNotesProps {
  notes: Note[];
  onCreateNote: () => void;
  onOpenNote: (noteId: string) => void;
}

const RecentNotes: React.FC<RecentNotesProps> = ({ notes, onCreateNote, onOpenNote }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Notes</CardTitle>
        <Button onClick={onCreateNote} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </CardHeader>
      <CardContent>
        {notes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No notes yet. Create your first note to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => onOpenNote(note.id)}
              >
                <h3 className="font-medium truncate">{note.title || 'Untitled'}</h3>
                <p className="text-sm text-muted-foreground truncate mt-1">
                  {note.content || 'No content'}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(note.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentNotes;
