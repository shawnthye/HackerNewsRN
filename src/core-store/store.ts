import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {commentsSlice} from '../features/comments/domain/comments-slice';
import {storiesSlice} from '../features/stories/domain/stories-slice';

const store = configureStore({
  reducer: {
    [storiesSlice.name]: storiesSlice.reducer,
    [commentsSlice.name]: commentsSlice.reducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
