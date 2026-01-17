import React from 'react';

interface TwitchEmbedProps {
  channel: string;
}

const TwitchEmbed: React.FC<TwitchEmbedProps> = ({ channel }) => {
  console.log('[DEBUG] TwitchEmbed: Rendering embed for channel:', channel);
  
  // Get the parent domain for Twitch embed
  const parentDomain = window.location.hostname;
  const embedUrl = `https://player.twitch.tv/?channel=${channel}&parent=${parentDomain}&muted=false`;
  
  console.log('[DEBUG] TwitchEmbed: Embed URL:', embedUrl, 'Parent domain:', parentDomain);

  return (
    <div className="w-full h-full min-h-[calc(100vh-3.5rem)] bg-black">
      <div className="max-w-[2200px] mx-auto p-4 md:p-10">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            allow="autoplay; fullscreen"
            onLoad={() => console.log('[DEBUG] TwitchEmbed: iframe loaded successfully')}
            onError={(e) => console.error('[DEBUG] TwitchEmbed: iframe error:', e)}
          ></iframe>
        </div>
        <div className="mt-4 text-center">
          <a
            href={`https://www.twitch.tv/${channel}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition-colors"
          >
            Watch on Twitch
          </a>
        </div>
      </div>
    </div>
  );
};

export default TwitchEmbed;

