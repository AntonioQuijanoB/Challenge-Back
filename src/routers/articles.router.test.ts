import { type ArticlesController } from '../controllers/articles.controller';
import { ArticlesRouter } from './articles.router';

describe('Given a instance of the class ArticlesRouter', () => {
  const controller = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as ArticlesController;
  const router = new ArticlesRouter(controller);
  test('Then it should be instance of the class', () => {
    expect(router).toBeInstanceOf(ArticlesRouter);
  });
});
