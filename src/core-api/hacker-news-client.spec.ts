import {AxiosError} from 'axios';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {HackerNewsClient} from './hacker-news-client';

export {};

/**
 * These tests is not really meaningful, just for coverage
 */

const handlers = [
  rest.get('*/topstories.json', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json([1, 2, 3, 4, 5]));
  }),
  rest.get('*/item/1.json', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({id: 1}));
  }),
  rest.get('*/item/2.json', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({id: 2}));
  }),
  rest.get('*/item/100.json', (_, res, ctx) => {
    return res(ctx.status(500), ctx.json({id: 100}));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getTopStoriesIds()', () => {
  it('success', async () => {
    const ids = await HackerNewsClient.getTopStoriesIds();
    expect(ids.length).toEqual(5);
  });
});

describe('getHackerNewsItem()', () => {
  it('success', async () => {
    const item = await HackerNewsClient.getHackerNewsItem(1);
    expect(item.id).toEqual(1);
  });

  it('should failed', async () => {
    try {
      await HackerNewsClient.getHackerNewsItem(100);
    } catch (e) {
      const error = e as AxiosError;

      expect(error.response?.status).toBe(500);
    }
  });
});

describe('getHackerNewsItemByIds()', () => {
  it('success', async () => {
    const items = await HackerNewsClient.getHackerNewsItemByIds([1, 2]);
    expect(items[0].id).toEqual(1);
    expect(items[1].id).toEqual(2);
  });

  it('should failed', async () => {
    try {
      await HackerNewsClient.getHackerNewsItemByIds([100]);
    } catch (e) {
      // any error will just throw and exist early for now
      const error = e as AxiosError;
      expect(error.response?.status).toBe(500);
    }
  });
});
