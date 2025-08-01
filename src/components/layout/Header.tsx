import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, LogOut, User, Settings } from 'lucide-react';
import QuickSearch from '@/components/dashboard/QuickSearch';

interface HeaderProps {
  user?: { name: string; email: string; avatar?: string };
  onToggleSidebar: () => void;
  onSearch: (query: string) => void;
  onLogout: () => void;
  onProfileClick: () => void;
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  user,
  onToggleSidebar,
  onSearch,
  onLogout,
  onProfileClick,
  onSettingsClick
}) => {
  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onToggleSidebar}>
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 max-w-md mx-4">
        <QuickSearch onSearch={onSearch} />
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onProfileClick}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onSettingsClick}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
