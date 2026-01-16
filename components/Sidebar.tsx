
import React from 'react';
import { Home, Compass, PlaySquare, Clock, ThumbsUp, Layers, History, Music, Gamepad2, Trophy, Newspaper } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeCategory: string;
  onCategorySelect: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeCategory, onCategorySelect }) => {
  const mainItems = [
    { icon: Home, label: 'Home', id: 'all' },
    { icon: Compass, label: 'Explore', id: 'explore' },
    { icon: PlaySquare, label: 'Subscriptions', id: 'subs' },
  ];

  const libraryItems = [
    { icon: Layers, label: 'Library' },
    { icon: History, label: 'History' },
    { icon: Clock, label: 'Watch later' },
    { icon: ThumbsUp, label: 'Liked videos' },
  ];

  const exploreItems = [
    { icon: Music, label: 'Music', id: 'music' },
    { icon: Gamepad2, label: 'Gaming', id: 'gaming' },
    { icon: Trophy, label: 'Sports', id: 'sports' },
    { icon: Newspaper, label: 'News', id: 'news' },
  ];

  if (!isOpen) {
    return (
      <aside className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-20 bg-black flex flex-col items-center py-4 z-40">
        {mainItems.map((item) => (
          <button 
            key={item.label}
            onClick={() => item.id && onCategorySelect(item.id)}
            className={`flex flex-col items-center gap-1 w-full py-4 hover:bg-zinc-900 rounded-xl transition-colors ${activeCategory === item.id ? 'text-primary' : 'text-zinc-400'}`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px]">{item.label}</span>
          </button>
        ))}
      </aside>
    );
  }

  return (
    <aside className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 bg-black overflow-y-auto z-40 border-r border-zinc-900 custom-scrollbar p-3">
      <div className="space-y-1">
        {mainItems.map((item) => (
          <button
            key={item.label}
            onClick={() => item.id && onCategorySelect(item.id)}
            className={`w-full flex items-center gap-5 px-3 py-2.5 rounded-xl transition-all ${
              activeCategory === item.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-zinc-900 text-zinc-300'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeCategory === item.id ? 'text-primary' : 'text-zinc-300'}`} />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="h-px bg-zinc-800 my-4 mx-3"></div>

      <div className="space-y-1">
        <h3 className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Library</h3>
        {libraryItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-5 px-3 py-2.5 rounded-xl hover:bg-zinc-900 text-zinc-300 transition-all"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="h-px bg-zinc-800 my-4 mx-3"></div>

      <div className="space-y-1">
        <h3 className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Explore</h3>
        {exploreItems.map((item) => (
          <button
            key={item.label}
            onClick={() => item.id && onCategorySelect(item.id)}
            className={`w-full flex items-center gap-5 px-3 py-2.5 rounded-xl transition-all ${
              activeCategory === item.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-zinc-900 text-zinc-300'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
