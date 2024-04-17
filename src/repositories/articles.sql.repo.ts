/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
import { type ArticleCreateDto } from '../entities/article.js';
const debug = createDebug('W7E:articles:repository:sql');

const select = {
  id: true,
  title: true,
  author: true,
  content: true,
  isPublished: true,
};
export class ArticlesSqlRepo {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated articles fs repository');
  }

  async readAll() {
    const article = await this.prisma.article.findMany({
      distinct: ['createdAt', 'updatedAt'], // SELECT DISTINCT createdAt, updatedAt FROM article
    });
    return article;
  }

  async readById(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      select, // SELECT title, author... FROM article
    });

    if (!article) {
      throw new HttpError(404, 'Not Found', `Article ${id} not found`);
    }

    return article;
  }

  async create(data: ArticleCreateDto) {
    return this.prisma.article.create({
      data: {
        content: data.content ?? '',
        ...data,
      },
      select,
    });
  }

  async update(id: string, data: Partial<ArticleCreateDto>) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      select,
    });
    if (!article) {
      throw new HttpError(404, 'Not Found', `Article ${id} not found`);
    }

    return this.prisma.article.update({
      where: { id },
      data,
      select,
    });
  }

  async delete(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      select,
    });
    if (!article) {
      throw new HttpError(404, 'Not Found', `Article ${id} not found`);
    }

    return this.prisma.article.delete({
      where: { id },
      select,
    });
  }
}
