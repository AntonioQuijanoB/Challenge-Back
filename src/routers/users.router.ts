import { Router as createRouter } from 'express';
import createDebug from 'debug';

const debug = createDebug('W7E:users:router');

export class UsersRouter {
  router = createRouter();

  constructor() {
    debug('Instantiated users router');
  }
}
