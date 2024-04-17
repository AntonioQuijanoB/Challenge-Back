import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type MoviesController } from '../controllers/movies.controller';

const debug = createDebug('W7E:movies:router');

export class MoviesRouter {
  router = createRouter();

  constructor(private readonly controller: MoviesController) {
    debug('Instantiated movies router');

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
