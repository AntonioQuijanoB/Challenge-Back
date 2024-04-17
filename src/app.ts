import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { ArticlesController } from './controllers/articles.controller.js';
import { ArticlesRouter } from './routers/articles.router.js';
import { ErrorsMiddleware } from './middleware/errors.middleware.js';
import { type PrismaClient } from '@prisma/client';
import { ArticlesSqlRepo } from './repositories/articles.sql.repo.js';
import { MoviesRouter } from './routers/movies.router.js';
import { MoviesFsRepo } from './repositories/movies.fs.repo.js';
import { MoviesController } from './controllers/movies.controller.js';

const debug = createDebug('W7E:app');
export const createApp = () => {
  debug('Creating app');
  return express();
};

export const startApp = (app: Express, prisma: PrismaClient) => {
  debug('Starting app');
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.static('public'));

  const moviesRepo = new MoviesFsRepo();
  const moviesController = new MoviesController(moviesRepo);
  const moviesRouter = new MoviesRouter(moviesController);
  const articlesRepo = new ArticlesSqlRepo(prisma);
  const articlesController = new ArticlesController(articlesRepo);
  const articlesRouter = new ArticlesRouter(articlesController);
  app.use('/articles', articlesRouter.router);
  app.use('/movies', moviesRouter.router);

  const errorsMiddleware = new ErrorsMiddleware();
  app.use(errorsMiddleware.handle.bind(errorsMiddleware));
};
