export type Article = {
  id: string;
  title: string;
  author: string;
  content: string;
  isPublished: boolean;
};

export type ArticleCreateDto = {
  title: string;
  author: string;
  content: string;
  isPublished: boolean;
};
