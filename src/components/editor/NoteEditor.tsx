import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, ArrowLeft } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  updatedAt: string;
}

interface NoteEditorProps {
  note?: Note;
  onSave: (note: Partial<Note>) => void;
  onBack: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onBack }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState(note?.tags?.join(', ') || '');

  useEffect(() => {
    const autoSave = setTimeout(() => {
      if (title || content) {
        onSave({
          id: note?.id,
          title,
          content,
          tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
          updatedAt: new Date().toISOString()
        });
      }
    }, 1000);

    return () => clearTimeout(autoSave);
  }, [title, content, tags, note?.id, onSave]);

  const handleSave = () => {
    onSave({
      id: note?.id,
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-4 p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button onClick={handleSave} size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
      
      <div className="flex-1 p-4 space-y-4">
        <Input
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-medium border-0 px-0 focus-visible:ring-0"
        />
        
        <Input
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="text-sm"
        />
        
        <Textarea
          placeholder="Start writing your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 min-h-[400px] resize-none border-0 px-0 focus-visible:ring-0"
        />
      </div>
    </div>
  );
};

export default NoteEditor;
