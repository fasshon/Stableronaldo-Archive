
import React from 'react';
import { Video } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <div 
      className="group cursor-pointer space-y-3"
      onClick={() => onClick(video)}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800 transition-transform duration-300 group-hover:scale-[1.02]">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
          {video.duration}
        </div>
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300"></div>
      </div>
      
      <div className="flex gap-3">
        <img 
          src={video.channelAvatar} 
          alt={video.channelName}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <div className="flex items-center gap-1 mt-1.5 text-zinc-400">
            <span className="text-xs hover:text-white transition-colors">{video.channelName}</span>
            <CheckCircle2 className="w-3 h-3 fill-zinc-400 text-zinc-900" />
          </div>
          <div className="text-xs text-zinc-500 mt-0.5">
            {video.views} • {video.postedAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
