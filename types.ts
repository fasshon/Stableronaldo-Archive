
export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  thumbnail: string;
  channelName: string;
  channelAvatar: string;
  views: string;
  postedAt: string;
  uploadDate: number; // Timestamp for sorting
  duration: string;
  durationSeconds: number; // Seconds for sorting
  category: string;
  description: string;
}

export interface Category {
  id: string;
  label: string;
}

export type SortOption = 'date' | 'length' | 'title';
export type SortDirection = 'asc' | 'desc';
