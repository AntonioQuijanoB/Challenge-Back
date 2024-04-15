/* eslint-disable @typescript-eslint/member-ordering */
import { readFile, writeFile } from 'fs/promises';
import createDebug from 'debug';
import { type ArticleCreateDto, type Article } from '../entities/article';
import { HttpError } from '../middleware/errors.middleware.js';
const debug = createDebug('W7E:articles:repository:fs');

export class ArticlesFsRepo {
  constructor() {
    debug('Instantiated articles fs repository');
  }

  private async load(): Promise<Article[]> {
    const data = await readFile('articles.json', 'utf-8');
    return JSON.parse(data) as Article[];
  }

  private async save(articles: Article[]) {
    await writeFile('articles.json', JSON.stringify(articles, null, 2));
  }

  async readAll() {
    const articles = await this.load();
    return articles;
  }

  async readById(id: string) {
    const articles = await this.load();
    const article = articles.find((article) => article.id === id);

    if (!article) {
      throw new HttpError(404, 'Not Found', `Article ${id} not found`);
    }

    return article;
  }

  async create(data: ArticleCreateDto) {
    const newArticle: Article = {
      id: crypto.randomUUID(),
      ...data,
    };
    let articles = await this.load();
    articles = [...articles, newArticle];
    await this.save(articles);
    return newArticle;
  }

  async update(id: string, data: Partial<Article>) {
    let articles = await this.load();
    const article = articles.find((article) => article.id === id);
    if (!article) {
      throw new HttpError(404, 'Not Found', `Article ${id} not found`);
    }

    const newArticle: Article = { ...article, ...data };
    articles = articles.map((article) =>
      article.id === id ? newArticle : article
    );
    await this.save(articles);
    return newArticle;
  }

  async delete(id: string) {
    let articles = await this.load();
    const article = articles.find((article) => article.id === id);
    if (!article) {
      throw new HttpError(404, 'Not Found', `Article ${id} not found`);
    }

    articles = articles.filter((article) => article.id !== id);
    await this.save(articles);
    return article;
  }
}
