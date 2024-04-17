/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextFunction, type Request, type Response } from 'express';
import createDebug from 'debug';

import { type ArticlesSqlRepo } from '../repositories/articles.sql.repo';
import {
  articleCreateDtoSchema,
  articleUpdateDtoSchema,
} from '../entities/article.schema.js';
import { HttpError } from '../middleware/errors.middleware.js';
import { type MoviesFsRepo } from '../repositories/movies.fs.repo';
import { type Movie, type MovieCreateDto } from '../entities/movie';

const debug = createDebug('W7E:articles:controller');

export class MoviesController {
  constructor(private readonly repo: MoviesFsRepo) {
    debug('Instantiated movie controller');
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const result = await this.repo.readAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const result = await this.repo.readById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const data = req.body as Movie;

    const {
      error,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value,
    }: { error: Error | undefined; value: MovieCreateDto } =
      articleCreateDtoSchema.validate(data, {
        abortEarly: false,
      });

    if (error) {
      next(new HttpError(406, 'Not Acceptable', error.message));
      return;
    }

    try {
      const result = await this.repo.create(value);
      res.status(201);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = req.body as Movie;

    const { error } = articleUpdateDtoSchema.validate(data, {
      abortEarly: false,
    });

    if (error) {
      next(new HttpError(406, 'Not Acceptable', error.message));
      return;
    }

    try {
      const result = await this.repo.update(id, data);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const result = await this.repo.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
