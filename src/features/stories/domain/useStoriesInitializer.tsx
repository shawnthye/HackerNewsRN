import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../@core-store/hooks';
import {initialStories, selectIsError, selectNotEmpty} from './stories-slice';

export const useStoriesInitializer = () => {
  const [loading, setLoading] = React.useState<boolean>(true);

  const notEmpty = useAppSelector(selectNotEmpty);
  const isError = useAppSelector(selectIsError);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(initialStories()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  return {
    isEmpty: !notEmpty,
    loading,
    isError,
    refresh: () => {
      setLoading(true);

      dispatch(initialStories()).then(() => {
        setLoading(false);
      });
    },
  };
};
