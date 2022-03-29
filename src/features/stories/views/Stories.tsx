import React from 'react';
import {useStoriesInitializer} from '../domain/useStoriesInitializer';
import ErrorStories from './ErrorStories';
import InitializingStoriesIds from './InitializingStoriesIds';
import NoStories from './NoStories';
import StoriesList from './StoriesList';

const Stories = () => {
  const {loading, isEmpty, isError, refresh} = useStoriesInitializer();

  if (loading && isEmpty) {
    return <InitializingStoriesIds />;
  }

  if (isError && isEmpty) {
    return <ErrorStories refresh={refresh} />;
  }

  if (isEmpty) {
    return <NoStories />;
  }

  return (
    <StoriesList
      onRefresh={() => {
        refresh();
      }}
      refreshing={loading}
    />
  );
};

export default Stories;
