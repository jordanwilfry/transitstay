export interface Cluster {
  id: string;
  title: string;
  description?: string;
  postCount: number;
  color: string;
  icon?: string;
  gradientFrom?: string;
  gradientTo?: string;
  createdAt: string;
}

export interface Post {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  clusterId?: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  tags: string[];
}

export interface Moodboard {
  id: string;
  title: string;
  description?: string;
  clusters: Cluster[];
  posts: Post[];
  createdAt: string;
}

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
}

export interface PexelsResponse {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  total_results: number;
  next_page?: string;
  prev_page?: string;
}

export interface Result {
  picture: {
    medium: string;
  };
}