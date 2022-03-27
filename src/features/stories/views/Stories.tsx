import React from 'react';
import {useStoriesInitializer} from '../data/stories-slice';
import InitializingStoriesIds from './InitializingStoriesIds';
import NoStories from './NoStories';
import StoriesList from './StoriesList';

const Stories = () => {
  const {loading, isEmpty, refresh} = useStoriesInitializer();

  if (loading && isEmpty) {
    return <InitializingStoriesIds />;
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
