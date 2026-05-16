export type FeedItem = {
  id: string;
  type: string;
  title?: string;
  subtitle?: string;
  caption?: string;
  creator?: string;
  avatar?: string;
  accent?: string;
  tags?: string[];
  stats?: {
    likes?: string | number;
    comments?: string | number;
    shares?: string | number;
  };
  [key: string]: unknown;
};

export type FeedItemUpdate = FeedItem | ((item: FeedItem) => FeedItem);

