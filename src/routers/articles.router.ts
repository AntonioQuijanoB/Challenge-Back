import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type ArticlesController } from '../controllers/articles.controller';

const debug = createDebug('W7E:articles:router');

export class ArticlesRouter {
  router = createRouter();

  constructor(private readonly controller: ArticlesController) {
    debug('Instantiated articles router');

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
