import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import VideoCard from './components/VideoCard';
import VideoPlayer from './components/VideoPlayer';
import { INITIAL_VIDEOS } from './constants';
import { Video, SortOption } from './types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const VIDEOS_PER_PAGE = 30; // 5 columns x 6 rows

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory, sortBy]);

  const filteredAndSortedVideos = useMemo(() => {
    let result = INITIAL_VIDEOS.filter(v => {
      const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.channelName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || v.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.uploadDate - a.uploadDate;
        case 'length':
          return b.durationSeconds - a.durationSeconds;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [searchQuery, activeCategory, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedVideos.length / VIDEOS_PER_PAGE);
  
  const paginatedVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
    return filteredAndSortedVideos.slice(startIndex, startIndex + VIDEOS_PER_PAGE);
  }, [filteredAndSortedVideos, currentPage]);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleHomeClick = () => {
    setSelectedVideo(null);
    setActiveCategory('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
      <Header 
        onSearch={setSearchQuery} 
        onHomeClick={handleHomeClick}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      
      <div className="pt-14">
        <main className="max-w-[2200px] mx-auto p-4 md:p-10">
          {!selectedVideo ? (
            <div className="space-y-10">
              {paginatedVideos.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-x-8 gap-y-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    {paginatedVideos.map((video) => (
                      <VideoCard 
                        key={video.id} 
                        video={video} 
                        onClick={handleVideoSelect}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-6 py-8 border-t border-zinc-900 mt-10">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-zinc-800 transition-all hover:scale-110 active:scale-95"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      
                      <div className="flex items-center gap-3">
                        {Array.from({ length: totalPages }).map((_, i) => {
                          const pageNum = i + 1;
                          if (totalPages > 8 && Math.abs(currentPage - pageNum) > 2 && pageNum !== 1 && pageNum !== totalPages) {
                             // Corrected: Removed duplicate key attribute from the span element.
                             if (pageNum === 2 || pageNum === totalPages - 1) return <span key={`dots-${pageNum}`} className="text-zinc-700">...</span>;
                             return null;
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-12 h-12 rounded-2xl text-sm font-black transition-all ${
                                currentPage === pageNum 
                                  ? 'bg-primary text-black shadow-[0_0_20px_rgba(37,150,190,0.3)]' 
                                  : 'bg-zinc-900 text-zinc-600 hover:text-white hover:bg-zinc-800'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-zinc-800 transition-all hover:scale-110 active:scale-95"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-40 text-center">
                  <h2 className="text-3xl font-black mb-4">NO ARCHIVES FOUND</h2>
                  <p className="text-zinc-500 max-w-md mx-auto mb-10">Nothing matches your search or filters in the current selection.</p>
                  <button onClick={handleHomeClick} className="px-10 py-4 bg-primary text-black font-black rounded-full hover:scale-105 transition-transform">
                    RESET VIEW
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in-95 duration-700">
              <VideoPlayer 
                video={selectedVideo} 
                relatedVideos={INITIAL_VIDEOS.filter(v => v.id !== selectedVideo.id).slice(0, 10)}
                onVideoSelect={handleVideoSelect}
              />
            </div>
          )}
        </main>
      </div>
      
      <footer className="mt-10 py-8 border-t border-zinc-900">
        <div className="max-w-[2200px] mx-auto px-4 md:px-10">
          <div className="flex flex-col items-center gap-2 text-zinc-500 text-sm">
            <p className="text-zinc-400">Stableronaldo Archive : 2026</p>
            <p>
              Made by{' '}
              <a 
                href="https://x.com/fasshn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors underline"
              >
                Fasshn
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;