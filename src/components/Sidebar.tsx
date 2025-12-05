import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'player', label: 'Плеер', icon: 'Music' },
    { id: 'playlists', label: 'Плейлисты', icon: 'ListMusic' },
    { id: 'favorites', label: 'Избранное', icon: 'Heart' },
    { id: 'profile', label: 'Личный кабинет', icon: 'User' },
    { id: 'admin', label: 'Админ-панель', icon: 'Settings' },
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <img 
            src="https://cdn.poehali.dev/projects/a74b180d-2247-4cd1-b29d-921fdb8c9762/files/a6ac8a8d-67a8-401c-ac54-c5750be0f30e.jpg" 
            alt="BlueMusic Logo"
            className="w-12 h-12 rounded-xl object-cover"
          />
          <div>
            <h1 className="text-xl font-bold">BlueMusic</h1>
            <p className="text-xs text-muted-foreground">Твоя музыка</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? 'default' : 'ghost'}
              className={`w-full justify-start gap-3 ${
                currentPage === item.id 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon name={item.icon as any} size={20} />
              {item.label}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <span className="text-sm font-medium">ИВ</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-medium truncate">Иван Петров</div>
            <div className="text-xs text-muted-foreground">Premium</div>
          </div>
        </div>
      </div>
    </div>
  );
}