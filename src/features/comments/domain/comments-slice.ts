import React from 'react';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  generateNextPageToken,
  PageToken,
} from '../../../@core-api/generateNextPageToken';
import {HackerNewsClient} from '../../../@core-api/hacker-news-client';
import {useAppDispatch} from '../../../@core-store/hooks';
import {RootState} from '../../../@core-store/store';

const PAGE_SIZE = 8;

export interface CommentViewState {
  depth: number;
  comment: HackerNewsItem;
}

export interface CommentsViewState {
  story: HackerNewsItem | undefined;
  states: CommentViewState[];
  loading: boolean;
  error: boolean;
  nextPageToken: any;
}

const initialState: CommentsViewState = {
  story: undefined,
  states: [],
  loading: true,
  error: false,
  nextPageToken: null,
};

const fetchValidComments = async (ids: number[]): Promise<HackerNewsItem[]> => {
  const comments = await HackerNewsClient.getHackerNewsItemByIds(ids);

  return comments.filter(comment => !comment.deleted && comment.text);
};

/**
 * Fetch the all the kids from different parent asynchronous
 */
const getCommentRecursive = async (
  ids: number[],
  depth: number,
  data: CommentViewState[],
): Promise<CommentViewState[]> => {
  let comments = await fetchValidComments(ids);

  const groupedByParentId = comments.reduce((groups, comment) => {
    const {parent: parentId} = comment;

    const viewState: CommentViewState = {
      depth: depth,
      comment: comment,
    };

    if (groups.has(parentId)) {
      groups.get(parentId)!.push(viewState);
    } else {
      groups.set(parentId, [viewState]);
    }
    return groups;
  }, new Map<number, CommentViewState[]>());

  groupedByParentId.forEach((viewStates, parentId) => {
    const pos = data.findIndex(it => it.comment.id === parentId);

    if (pos >= 0) {
      data.splice(pos + 1, 0, ...viewStates);
    } else {
      data.push(...viewStates);
    }
  });

  // get All the kid id from different comment
  const kidIds: number[] = comments
    .map(it => it.kids)
    .filter(it => it)
    .flat() as number[];

  if (kidIds.length) {
    // we fetch all the nested kids asynchronous
    return await getCommentRecursive(kidIds, depth + 1, data);
  } else {
    // no more kid, we just reurn
    return data;
  }
};

export const initialComments = createAsyncThunk<CommentsViewState, number>(
  'comments/initial',
  async (storyId, {getState}) => {
    const state = getState() as RootState;

    const story = state.stories.stories.find(it => it.id === storyId)!;

    const ids = story.kids as number[];

    const end = Math.min(PAGE_SIZE, ids.length);

    const states = await getCommentRecursive(
      ids.slice(0, Math.min(PAGE_SIZE, ids.length)),
      0,
      [],
    );

    const viewState: CommentsViewState = {
      story: story,
      states: states,
      loading: false,
      error: false,
      nextPageToken: generateNextPageToken(ids.length, end, PAGE_SIZE),
    };

    return viewState;
  },
);

export const nextComments = createAsyncThunk<CommentViewState[], any>(
  'comments/next',
  async (arg: any, {getState}) => {
    const state = getState() as RootState;

    const storyId = state.comments.story?.id!;

    const story = state.stories.stories.find(it => it.id === storyId)!;

    const ids = story.kids!;
    const token = arg as PageToken;

    return await getCommentRecursive(ids.slice(token.start, token.end), 0, []);
  },
);

export const useCommentsInitializer = (storyId: number) => {
  const [loading, setLoading] = React.useState<boolean>(true);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(initialComments(storyId)).then(() => {
      setLoading(false);
    });
  }, [dispatch, storyId]);

  return {
    loading,
    refresh: () => {
      setLoading(true);
      dispatch(initialComments(storyId)).then(() => {
        setLoading(false);
      });
    },
  };
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initialComments.pending, state => {
      state.loading = true;
    });
    builder.addCase(initialComments.fulfilled, (_, action) => {
      return action.payload;
    });
    builder.addCase(initialComments.rejected, (state, action) => {
      state.loading = false;
      console.error(JSON.stringify(action));
    });
    builder.addCase(nextComments.pending, state => {
      state.loading = true;
    });
    builder.addCase(nextComments.fulfilled, (state, action) => {
      state.loading = false;
      state.states.push(...action.payload);
      state.nextPageToken = generateNextPageToken(
        state.story!.kids!.length,
        state.nextPageToken.end,
        PAGE_SIZE,
      );
    });
  },
});

// const selectIsEmpty = (state: RootState) => {
//   return state.comments.states.length <= 0;
// };

export const selectComments = (state: RootState) => state.comments;

const commentsReducer = commentsSlice.reducer;

export default commentsReducer;
