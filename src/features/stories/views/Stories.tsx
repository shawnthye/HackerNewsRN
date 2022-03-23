import React from 'react';
import {useStoriesInitializer} from '../data/stories-slice';
import LoadingStoriesIds from './LoadingStoriesIds';
import NoStories from './NoStories';
import StoriesList from './StoriesList';

const Stories = () => {
  const {loading, isEmpty, refresh} = useStoriesInitializer();

  if (loading && isEmpty) {
    return <LoadingStoriesIds />;
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
