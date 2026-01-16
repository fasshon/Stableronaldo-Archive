
import React from 'react';
import { Video } from '../types';
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal, Sparkles } from 'lucide-react';

interface VideoPlayerProps {
  video: Video;
  relatedVideos: Video[];
  onVideoSelect: (video: Video) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, relatedVideos, onVideoSelect }) => {
  console.log('[DEBUG] VideoPlayer: Component rendering', {
    videoId: video.id,
    videoTitle: video.title.substring(0, 50),
    youtubeId: video.youtubeId,
    relatedVideosCount: relatedVideos.length
  });

  React.useEffect(() => {
    console.log('[DEBUG] VideoPlayer: useEffect - video changed, scrolling to top', {
      videoId: video.id
    });
    window.scrollTo(0, 0);
    console.log('[DEBUG] VideoPlayer: Scroll complete');
  }, [video]);

  const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`;
  console.log('[DEBUG] VideoPlayer: Embed URL:', embedUrl);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      <div className="lg:col-span-2 space-y-4">
        {/* Actual YouTube Embed */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={embedUrl}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => console.log('[DEBUG] VideoPlayer: iframe loaded successfully')}
            onError={(e) => console.error('[DEBUG] VideoPlayer: iframe error:', e)}
          ></iframe>
        </div>

        <div className="space-y-4">
          <h1 className="text-xl md:text-2xl font-bold line-clamp-2">{video.title}</h1>
          

          <div className="bg-zinc-900 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <span>{video.views}</span>
              <span>{video.postedAt}</span>
            </div>
            <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
              {video.description}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold">Up Next</h2>
        {relatedVideos.map((v) => (
          <div 
            key={v.id} 
            className="flex gap-3 group cursor-pointer"
            onClick={() => {
              console.log('[DEBUG] VideoPlayer: Related video clicked', {
                videoId: v.id,
                videoTitle: v.title.substring(0, 50),
                youtubeId: v.youtubeId
              });
              onVideoSelect(v);
            }}
          >
            <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-800">
              <img src={v.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="" />
              <div className="absolute bottom-1 right-1 bg-black/80 text-[10px] px-1 rounded">{v.duration}</div>
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <h3 className="text-sm font-bold line-clamp-2 leading-tight group-hover:text-primary transition-colors">{v.title}</h3>
              <p className="text-xs text-zinc-400 truncate">{v.channelName}</p>
              <p className="text-xs text-zinc-500">{v.views} • {v.postedAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
