
import React, { useState } from 'react';
import { Search, Mic, Bug, ArrowUpDown } from 'lucide-react';
import { SortOption } from '../types';

interface HeaderProps {
  onSearch: (query: string) => void;
  onHomeClick: () => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onHomeClick, sortBy, onSortChange }) => {
  console.log('[DEBUG] Header: Component rendering', {
    sortBy,
    hasOnSearch: !!onSearch,
    hasOnHomeClick: !!onHomeClick
  });

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[DEBUG] Header: Search form submitted', {
      searchValue,
      searchValueLength: searchValue.length
    });
    onSearch(searchValue);
    console.log('[DEBUG] Header: onSearch callback called');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-black flex items-center justify-between px-4 z-50 border-b border-zinc-800">
      <div className="flex items-center gap-2">
        <div 
          onClick={() => {
            console.log('[DEBUG] Header: Home logo clicked');
            onHomeClick();
            console.log('[DEBUG] Header: onHomeClick callback called');
          }}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-lg group-hover:bg-primary/10 transition-colors">
            <img 
              src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_d59671debd614502a569df718016cce8/default/dark/3.0" 
              alt="Stable Vods Logo" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <span className="text-xl font-black tracking-tighter">Stable<span className="text-primary">Vods</span></span>
        </div>
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-full border border-zinc-800 hidden md:flex ml-5">
          <div className="pl-2 pr-1.5 text-zinc-600">
            <ArrowUpDown className="w-3.5 h-3.5" />
          </div>
          {(['date', 'length', 'title'] as SortOption[]).map((option) => (
            <button
              key={option}
              onClick={() => {
                console.log('[DEBUG] Header: Sort option clicked', {
                  option,
                  currentSortBy: sortBy,
                  willChange: sortBy !== option
                });
                onSortChange(option);
                console.log('[DEBUG] Header: onSortChange callback called');
              }}
              className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase transition-all ${
                sortBy === option 
                  ? 'bg-white text-black' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
        <form onSubmit={handleSearch} className="flex">
          <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-l-full px-3 focus-within:border-primary transition-colors w-[500px]">
            <Search className="w-4 h-4 text-zinc-400 mr-2" />
            <input
              type="text"
              placeholder="Search archives"
              className="bg-transparent flex-1 py-1 text-sm focus:outline-none text-white"
              value={searchValue}
              onChange={(e) => {
                const newValue = e.target.value;
                console.log('[DEBUG] Header: Search input changed', {
                  oldValue: searchValue,
                  newValue,
                  length: newValue.length
                });
                setSearchValue(newValue);
              }}
              onFocus={() => console.log('[DEBUG] Header: Search input focused')}
              onBlur={() => console.log('[DEBUG] Header: Search input blurred')}
            />
          </div>
          <button className="bg-zinc-800 border-y border-r border-zinc-700 rounded-r-full px-4 hover:bg-zinc-700 transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <a
          href="https://github.com/fasshon/Stableronaldo-Archive/issues?q=is%3Aissue"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
          title="Report a bug"
        >
          <Bug className="w-6 h-6" />
        </a>
        <div className="h-8 w-px bg-zinc-800 mx-1 hidden sm:block"></div>
        <button className="p-1 hover:bg-zinc-800 rounded-full border-2 border-primary/20">
          <img 
            src="https://static-cdn.jtvnw.net/jtv_user_pictures/6ca42beb-4c07-4af8-ae40-3c1ddfa73260-profile_image-70x70.png" 
            alt="Profile" 
            className="w-8 h-8 rounded-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
