export type Movie = {
  id: string;
  title: string;
  author: string;
  content: string;
  isPublished: boolean;
};

export type MovieCreateDto = {
  title: string;
  author: string;
  content?: string;
  isPublished?: boolean;
};
