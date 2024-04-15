import { UsersRouter } from './users.router';

describe('Given a instance of the class UsersRouter', () => {
  const router = new UsersRouter();
  test('Then it should be instance of the class', () => {
    expect(router).toBeInstanceOf(UsersRouter);
  });
});
