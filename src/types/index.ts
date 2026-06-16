declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        autoplay?: boolean;
        loop?: boolean;
      };
    }
  }
}

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
