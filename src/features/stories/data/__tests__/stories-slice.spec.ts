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

describe('stories', () => {
  const ids = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22,
  ];

  const idHandlers = ids.map(id =>
    rest.get(`*/item/${id}.json`, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({id: id}));
    }),
  );

  const handlers = [
    rest.get('*/topstories.json', (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(ids));
    }),
    ...idHandlers,
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
