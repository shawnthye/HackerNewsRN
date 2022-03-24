import React from 'react';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {HackerNewsClient} from '../../../core-api/hacker-news-client';
import {useAppDispatch, useAppSelector} from '../../../core-store/hooks';
import {RootState} from '../../../core-store/store';

const PAGE_SIZE = 10;

export interface PageToken {
  start: number;
  end: number;
}

export interface StoriesPagination {
  ids: number[];
  stories: HackerNewsItem[];
  loading: boolean;
  error: boolean;
  nextPageToken: any;
}

const initialState: StoriesPagination = {
  ids: [],
  stories: [],
  loading: true,
  error: false,
  nextPageToken: null,
};

const generateNextPageToken = (max: number, currentEnd: number) => {
  const nextPageToken: PageToken = {
    start: currentEnd,
    end: Math.min(currentEnd + PAGE_SIZE, max),
  };

  return max > currentEnd ? nextPageToken : undefined;
};

const fetchStoriesByIds = async (ids: number[]) => {
  const jobs = ids.map(id => HackerNewsClient.getStory(id));
  return (await Promise.all(jobs)).filter(story => story.type === 'story');
};

/**
 * TODO
 * rename as initialStories
 *
 * First the story ids
 *
 * Fetch the first page and generate pageToken
 */
export const initialStories = createAsyncThunk<StoriesPagination, void>(
  'stories/create',
  async () => {
    const ids = await HackerNewsClient.getTopStoriesIds();

    // const token: PageToken = {
    //   start: 0,
    //   end: Math.min(PAGE_SIZE, ids.length),
    // };

    const end = Math.min(PAGE_SIZE, ids.length);

    const stories = await fetchStoriesByIds(
      ids.slice(0, Math.min(PAGE_SIZE, ids.length)),
    );

    const page: StoriesPagination = {
      ids: ids,
      stories: stories,
      loading: false,
      error: false,
      nextPageToken: generateNextPageToken(ids.length, end),
    };

    return page;
  },
);

export const nextStories = createAsyncThunk<HackerNewsItem[], any>(
  'stories/next',
  async (arg: any, {getState}) => {
    const state = getState() as RootState;

    const ids = state.stories.ids;
    const token = arg as PageToken;

    return await fetchStoriesByIds(ids.slice(token.start, token.end));
  },
);

export const useStoriesInitializer = () => {
  const [loading, setLoading] = React.useState<boolean>(true);

  const ids = useAppSelector(selectNotEmpty);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(initialStories()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  return {
    isEmpty: !ids,
    loading: loading,
    refresh: () => {
      setLoading(true);
      dispatch(initialStories()).then(() => {
        setLoading(false);
      });
    },
  };
};

// export const fetchStories = createAsyncThunk<Story[], void>(
//   "stories/fetch",
//   async (_, { rejectWithValue, getState, dispatch }) => {
//     return [];
//   }
// );

export const storiesSlice = createSlice({
  name: 'stories',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initialStories.pending, state => {
      state.loading = true;
    });
    builder.addCase(initialStories.fulfilled, (_, action) => {
      return action.payload;
    });
    builder.addCase(initialStories.rejected, (state, action) => {
      state.loading = false;
      console.error(JSON.stringify(action));
    });
    builder.addCase(nextStories.pending, state => {
      state.loading = true;
    });
    builder.addCase(nextStories.fulfilled, (state, action) => {
      state.loading = false;
      state.stories.push(...action.payload);
      state.nextPageToken = generateNextPageToken(
        state.ids.length,
        state.nextPageToken.end,
      );
    });
  },
});

export const selectNotEmpty = (state: RootState) => {
  return state.stories.ids.length >= 1;
};

export const selectStories = (state: RootState) => state.stories;

export const selectStory = (state: RootState, id: number) => {
  return state.stories.stories.find(story => story.id === id);
};

export default storiesSlice.reducer;
