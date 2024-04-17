/* eslint-disable @typescript-eslint/member-ordering */
import { readFile, writeFile } from 'fs/promises';
import createDebug from 'debug';

import { HttpError } from '../middleware/errors.middleware.js';
import { type MovieCreateDto, type Movie } from '../entities/movie.js';
const debug = createDebug('W7E:articles:repository:fs');

export class MoviesFsRepo {
  constructor() {
    debug('Instantiated articles fs repository');
  }

  private async load(): Promise<Movie[]> {
    const data = await readFile('movie.json', 'utf-8');
    return JSON.parse(data) as Movie[];
  }

  private async save(movies: Movie[]) {
    await writeFile('movie.json', JSON.stringify(movies, null, 2));
  }

  async readAll() {
    const movies = await this.load();
    return movies;
  }

  async readById(id: string) {
    const movies = await this.load();
    const movie = movies.find((movie) => movie.id === id);

    if (!movie) {
      throw new HttpError(404, 'Not Found', `Movie ${id} not found`);
    }

    return movie;
  }

  async create(data: MovieCreateDto) {
    const newMovie: Movie = {
      id: crypto.randomUUID(),
      content: data.content ?? '',
      isPublished: data.isPublished ?? false,
      ...data,
    };
    let movies = await this.load();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    movies = [...movies, newMovie];
    await this.save(movies);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return newMovie;
  }

  async update(id: string, data: Partial<Movie>) {
    let movies = await this.load();
    const movie = movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new HttpError(404, 'Not Found', `Movie ${id} not found`);
    }

    const newMovie: Movie = { ...movie, ...data };
    movies = movies.map((movie) => (movie.id === id ? newMovie : movie));
    await this.save(movies);
    return newMovie;
  }

  async delete(id: string) {
    let movies = await this.load();
    const movie = movies.find((movies) => movies.id === id);
    if (!movie) {
      throw new HttpError(404, 'Not Found', `Movie ${id} not found`);
    }

    movies = movies.filter((movie) => movie.id !== id);
    await this.save(movies);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return movie;
  }
}
