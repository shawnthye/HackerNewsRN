import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import storiesReducer, {
  storiesSlice,
} from '../features/stories/data/stories-slice';

const store = configureStore({
  reducer: {
    [storiesSlice.name]: storiesReducer,
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
