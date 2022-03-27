import {configureStore} from '@reduxjs/toolkit';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {initialStories, storiesSlice} from '../stories-slice';

// test('should handle initial state', () => {
//   expect(storiesSlice.reducer(undefined, {type: 'unknown'})).toEqual({
//     ids: [],
//     stories: [],
//     loading: true,
//     error: false,
//     nextPageToken: null,
//   });
// });

describe('', () => {
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
    rest.get('*/item/3.json', (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({id: 3}));
    }),
    rest.get('*/item/4.json', (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({id: 4}));
    }),
    rest.get('*/item/5.json', (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({id: 5}));
    }),
  ];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should set loading', async () => {
    const state = storiesSlice.reducer(
      storiesSlice.getInitialState(),
      initialStories.pending,
    );

    expect(state.loading).toBe(true);
  });

  it('should be failed', async () => {
    const state = storiesSlice.reducer(
      storiesSlice.getInitialState(),
      initialStories.rejected,
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });

  it('should fetch all ids', async () => {
    const store = configureStore({
      reducer: {
        stories: storiesSlice.reducer,
      },
    });

    await store.dispatch(initialStories());

    const state = store.getState();

    expect(state.stories.ids).toStrictEqual([1, 2, 3, 4, 5]);
  });
});
