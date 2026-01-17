import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import VideoCard from './components/VideoCard';
import VideoPlayer from './components/VideoPlayer';
import TwitchEmbed from './components/TwitchEmbed';
import { INITIAL_VIDEOS } from './constants';
import { Video, SortOption, SortDirection } from './types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const VIDEOS_PER_PAGE = 30; // 5 columns x 6 rows

const App: React.FC = () => {
  console.log('[DEBUG] App.tsx: Component rendering');
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLive, setIsLive] = useState(false);
  const [showLiveView, setShowLiveView] = useState(false);

  console.log('[DEBUG] App.tsx: Initial state -', {
    activeCategory,
    selectedVideo: selectedVideo?.id || null,
    searchQuery,
    sortBy,
    sortDirection,
    currentPage
  });

  // Check live status
  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        console.log('[DEBUG] App.tsx: Checking live status');
        const response = await fetch('https://www.henrikhjelm.se/api/twitch.php?user=stableronaldo');
        const data = await response.json();
        console.log('[DEBUG] App.tsx: Live status response:', data);
        
        const nowLive = data.live === 'yes';
        setIsLive(nowLive);
        console.log('[DEBUG] App.tsx: Live status updated:', nowLive);
      } catch (error) {
        console.error('[DEBUG] App.tsx: Error checking live status:', error);
      }
    };

    // Check immediately
    checkLiveStatus();
    
    // Check every 60 seconds
    const interval = setInterval(checkLiveStatus, 60000);
    
    return () => clearInterval(interval);
  }, [isLive]);

  useEffect(() => {
    console.log('[DEBUG] App.tsx: useEffect triggered - filters changed', {
      searchQuery,
      activeCategory,
      sortBy,
      sortDirection
    });
    setCurrentPage(1);
    console.log('[DEBUG] App.tsx: Reset currentPage to 1');
  }, [searchQuery, activeCategory, sortBy, sortDirection]);

  const filteredAndSortedVideos = useMemo(() => {
    console.log('[DEBUG] App.tsx: useMemo - filtering and sorting videos', {
      totalVideos: INITIAL_VIDEOS.length,
      searchQuery,
      activeCategory,
      sortBy
    });
    
    let result = INITIAL_VIDEOS.filter(v => {
      const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.channelName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || v.category === activeCategory;
      const matches = matchesSearch && matchesCategory;
      
      if (!matches && searchQuery) {
        console.log('[DEBUG] App.tsx: Video filtered out:', {
          title: v.title.substring(0, 50),
          matchesSearch,
          matchesCategory
        });
      }
      
      return matches;
    });

    console.log('[DEBUG] App.tsx: After filtering:', {
      filteredCount: result.length
    });

    const sorted = [...result].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = b.uploadDate - a.uploadDate;
          break;
        case 'length':
          comparison = b.durationSeconds - a.durationSeconds;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        default:
          comparison = 0;
      }
      // Reverse if ascending direction
      return sortDirection === 'asc' ? -comparison : comparison;
    });

    console.log('[DEBUG] App.tsx: After sorting:', {
      sortedCount: sorted.length,
      firstVideo: sorted[0]?.title?.substring(0, 50) || 'none',
      lastVideo: sorted[sorted.length - 1]?.title?.substring(0, 50) || 'none'
    });

    return sorted;
  }, [searchQuery, activeCategory, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedVideos.length / VIDEOS_PER_PAGE);
  console.log('[DEBUG] App.tsx: Pagination info:', {
    totalVideos: filteredAndSortedVideos.length,
    videosPerPage: VIDEOS_PER_PAGE,
    totalPages,
    currentPage
  });
  
  const paginatedVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
    const endIndex = startIndex + VIDEOS_PER_PAGE;
    const paginated = filteredAndSortedVideos.slice(startIndex, endIndex);
    
    console.log('[DEBUG] App.tsx: Paginated videos:', {
      startIndex,
      endIndex,
      paginatedCount: paginated.length,
      videoIds: paginated.map(v => v.id)
    });
    
    return paginated;
  }, [filteredAndSortedVideos, currentPage]);

  const handleVideoSelect = (video: Video) => {
    console.log('[DEBUG] App.tsx: handleVideoSelect called', {
      videoId: video.id,
      videoTitle: video.title.substring(0, 50),
      youtubeId: video.youtubeId
    });
    setSelectedVideo(video);
    console.log('[DEBUG] App.tsx: selectedVideo state updated');
  };

  const handleHomeClick = () => {
    console.log('[DEBUG] App.tsx: handleHomeClick called - resetting to home');
    setSelectedVideo(null);
    setActiveCategory('all');
    setSearchQuery('');
    setCurrentPage(1);
    setShowLiveView(false);
    console.log('[DEBUG] App.tsx: All state reset to defaults');
  };


  console.log('[DEBUG] App.tsx: Rendering JSX', {
    hasSelectedVideo: !!selectedVideo,
    paginatedVideosCount: paginatedVideos.length,
    totalPages
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
      <Header 
        onSearch={(query) => {
          console.log('[DEBUG] App.tsx: Search query changed from Header:', query);
          setSearchQuery(query);
        }}
        onHomeClick={handleHomeClick}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={(sort, direction) => {
          console.log('[DEBUG] App.tsx: Sort changed from Header:', { sort, direction });
          setSortBy(sort);
          setSortDirection(direction);
        }}
        isLive={isLive}
        showLiveView={showLiveView}
        onLiveViewChange={setShowLiveView}
      />
      
      <div className="pt-14">
        <main className="max-w-[2200px] mx-auto p-4 md:p-10">
          {showLiveView ? (
            <TwitchEmbed channel="stableronaldo" />
          ) : !selectedVideo ? (
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
                        onClick={() => {
                          console.log('[DEBUG] App.tsx: Previous page clicked, current:', currentPage);
                          setCurrentPage(p => {
                            const newPage = Math.max(1, p - 1);
                            console.log('[DEBUG] App.tsx: Previous page set to:', newPage);
                            return newPage;
                          });
                        }}
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
                              onClick={() => {
                                console.log('[DEBUG] App.tsx: Page number clicked:', pageNum, 'current:', currentPage);
                                setCurrentPage(pageNum);
                                console.log('[DEBUG] App.tsx: Page set to:', pageNum);
                              }}
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
                        onClick={() => {
                          console.log('[DEBUG] App.tsx: Next page clicked, current:', currentPage, 'totalPages:', totalPages);
                          setCurrentPage(p => {
                            const newPage = Math.min(totalPages, p + 1);
                            console.log('[DEBUG] App.tsx: Next page set to:', newPage);
                            return newPage;
                          });
                        }}
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