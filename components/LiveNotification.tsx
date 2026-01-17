import React, { useEffect, useState } from 'react';
import { X, Radio } from 'lucide-react';

interface LiveNotificationProps {
  isLive: boolean;
  onClose: () => void;
  onWatchClick: () => void;
}

const LiveNotification: React.FC<LiveNotificationProps> = ({ isLive, onClose, onWatchClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLive) {
      setIsVisible(true);
      console.log('[DEBUG] LiveNotification: Showing live notification');
    } else {
      setIsVisible(false);
    }
  }, [isLive]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-5 duration-500">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl border-2 border-primary/50 p-4 max-w-md mx-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Radio className="w-6 h-6 text-white animate-pulse" />
            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-black text-white text-lg">Ron is currently live!</h3>
            <p className="text-white/90 text-sm">Watch the stream now</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onWatchClick}
              className="px-4 py-2 bg-white text-purple-600 font-bold rounded-full hover:bg-zinc-100 transition-colors text-sm"
            >
              Watch
            </button>
            <button
              onClick={() => {
                setIsVisible(false);
                onClose();
              }}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveNotification;

