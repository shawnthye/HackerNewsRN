import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  generateNextPageToken,
  PageToken,
} from '../../../@core-api/generateNextPageToken';
import {HackerNewsClient} from '../../../@core-api/hacker-news-client';
import {RootState} from '../../../@core-store/store';

const PAGE_SIZE = 20;

export interface StoriesState {
  ids: number[];
  stories: HackerNewsItem[];
  loading: boolean;
  error: boolean;
  errorMessage: string | undefined;
  nextPageToken: any;
}

const initialState: StoriesState = {
  ids: [],
  stories: [],
  loading: true,
  error: false,
  errorMessage: undefined,
  nextPageToken: null,
};

const fetchStoriesByIds = async (ids: number[]) => {
  const items = await HackerNewsClient.getHackerNewsItemByIds(ids);
  return items.filter(item => item.type === 'story');
};

export const initialStories = createAsyncThunk<StoriesState, void>(
  'stories/create',
  async () => {
    const ids = await HackerNewsClient.getTopStoriesIds();

    const end = Math.min(PAGE_SIZE, ids.length);

    const stories = await fetchStoriesByIds(
      ids.slice(0, Math.min(PAGE_SIZE, ids.length)),
    );

    const page: StoriesState = {
      ids: ids,
      stories: stories,
      loading: false,
      error: false,
      errorMessage: undefined,
      nextPageToken: generateNextPageToken(ids.length, end, PAGE_SIZE),
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

export const storiesSlice = createSlice({
  name: 'stories',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initialStories.pending, state => {
      state.loading = true;
      state.error = false;
      state.errorMessage = undefined;
    });

    builder.addCase(initialStories.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.warn(JSON.stringify(action));
      state.errorMessage = action.error?.message;
    });

    builder.addCase(
      initialStories.fulfilled,
      (_, action: PayloadAction<StoriesState>) => {
        return action.payload;
      },
    );

    builder.addCase(nextStories.pending, state => {
      state.loading = true;
      state.errorMessage = undefined;
      state.error = false;
    });

    builder.addCase(nextStories.rejected, (state, action) => {
      state.error = true;
      state.errorMessage = action.error?.message;
      state.loading = false;
    });

    builder.addCase(
      nextStories.fulfilled,
      (state, action: PayloadAction<HackerNewsItem[]>) => {
        state.loading = false;
        state.stories.push(...action.payload);
        state.nextPageToken = generateNextPageToken(
          state.ids.length,
          state.nextPageToken.end,
          PAGE_SIZE,
        );
      },
    );
  },
});

export const selectIsError = (state: RootState) => {
  return state.stories.error;
};

export const selectNotEmpty = (state: RootState) => {
  return state.stories.ids.length >= 1;
};

export const selectState = (state: RootState) => state.stories;

export const selectStory = (state: RootState, id: number) => {
  return state.stories.stories.find(story => story.id === id);
};

export default storiesSlice.reducer;
