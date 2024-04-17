import e from 'express';
import { readFile } from 'fs/promises';
import { HttpError } from '../middleware/errors.middleware';
import { type ArticleCreateDto } from '../entities/article';
import { articleUpdateDtoSchema } from '../entities/article.schema';
import { MoviesFsRepo } from './movies.fs.repo';
import { type MovieCreateDto } from '../entities/movie';

jest.mock('fs/promises');

describe('Given a instance of the class ArticlesFsRepo', () => {
  const repo = new MoviesFsRepo();

  test('Then it should be instance of the class', () => {
    expect(repo).toBeInstanceOf(MoviesFsRepo);
  });
  describe('When we use the method readAll', () => {
    test('Then it should call readFile', async () => {
      (readFile as jest.Mock).mockResolvedValue('[]');
      const result = await repo.readAll();
      expect(readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When we use the method readById with a valid ID', () => {
    test('Then it should call readFile', async () => {
      (readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      const result = await repo.readById('1');
      expect(readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('When we use the method readById with an invalid ID', () => {
    test('Then it should throw an error', async () => {
      (readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      await expect(repo.readById('2')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Movie 2 not found')
      );
    });
  });

  describe('When we use the method create', () => {
    test('Then it should call readFile and writeFile', async () => {
      (readFile as jest.Mock).mockResolvedValue('[]');
      const data = {} as unknown as MovieCreateDto;
      const result = await repo.create(data);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      expect(result).toEqual({ id: expect.any(String) });
      expect(readFile).toHaveBeenCalled();
    });
  });
  describe('When we use the method update', () => {
    test('Then it should update the article with the provided ID', async () => {
      (readFile as jest.Mock).mockResolvedValue(
        JSON.stringify([
          { id: '1', title: 'Old Title', content: 'Old Content' },
          { id: '2', title: 'Second Article', content: 'Second Content' },
        ])
      );

      const updatedData = { title: 'New Title', content: 'New Content' };

      await repo.update('1', updatedData);
      expect(updatedData.title).toBe('New Title');
      expect(updatedData.content).toBe('New Content');
    });
  });
});
