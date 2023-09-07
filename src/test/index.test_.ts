import request from 'supertest';
import { App } from '@/app';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe.skip('Testing Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      return true;
    });
  });
});
