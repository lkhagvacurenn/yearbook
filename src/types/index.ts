export interface Student {
  id: string;
  name: string;
  quote: string;
}

export interface Memory {
  id: string;
  caption: string;
  rotation?: number;
  size?: 'sm' | 'md' | 'lg';
}

export type AppPhase =
  | 'loading'
  | 'invitation'
  | 'accepted'
  | 'cover'
  | 'book'
  | 'closing';

export interface PageSpread {
  leftPage: number;  // 1-indexed visual page number
  rightPage: number;
}
