export interface Link {
  id: string;
  title: string;
  description?: string;
  url?: string;
  icon?: string;
  isUser: boolean;
  newTab?: boolean;
  category?: string;
} 