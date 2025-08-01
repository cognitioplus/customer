import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  FileText, 
  Folder, 
  Tag, 
  Settings, 
  User,
  Plus
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  folders: Array<{ id: string; name: string; count: number }>;
  tags: Array<{ name: string; count: number }>;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onViewChange, 
  folders, 
  tags 
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'notes', label: 'All Notes', icon: FileText },
    { id: 'folders', label: 'Folders', icon: Folder },
    { id: 'tags', label: 'Tags', icon: Tag },
  ];

  return (
    <div className="w-64 bg-muted/30 border-r h-full flex flex-col">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <img 
            src="https://d64gsuwffb70l.cloudfront.net/68331580076e1e732c8e549f_1754012933968_b7199313.png" 
            alt="Cognitio+" 
            className="h-8 w-8"
          />
          <h1 className="font-bold text-lg">Cognitio+</h1>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={currentView === item.id ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => onViewChange(item.id)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      <Separator />

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Folders</h3>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            {folders.map((folder) => (
              <Button
                key={folder.id}
                variant="ghost"
                size="sm"
                className="w-full justify-between text-xs"
                onClick={() => onViewChange(`folder-${folder.id}`)}
              >
                <span>{folder.name}</span>
                <span className="text-muted-foreground">{folder.count}</span>
              </Button>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Tags</h3>
            <div className="space-y-1">
              {tags.map((tag) => (
                <Button
                  key={tag.name}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between text-xs"
                  onClick={() => onViewChange(`tag-${tag.name}`)}
                >
                  <span>#{tag.name}</span>
                  <span className="text-muted-foreground">{tag.count}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      <Separator />

      <div className="p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => onViewChange('profile')}
        >
          <User className="h-4 w-4 mr-2" />
          Profile
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => onViewChange('settings')}
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
