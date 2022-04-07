import React from 'react';
import {ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CircularProgress from '../../../@core-components/CircularProgress';
import {useAppDispatch, useAppSelector} from '../../../@core-store/hooks';
import {sizes, texts} from '../../../@core-theme';
import {
  CommentViewState,
  nextComments,
  selectComments,
} from '../domain/comments-slice';
import CommentItem from './CommentItem';

const keyExtractor = (state: CommentViewState) => `${state.comment.id}`;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 8,
  },
  listHeaderComponentStyle: {
    paddingHorizontal: sizes.contentHorizontalPadding,
    paddingVertical: 16,
  },
  listHeaderTextStyle: {
    ...texts.titleMedium,
  },
  footer: {
    paddingVertical: 12,
  },
});

const Header: React.FC<{story: HackerNewsItem | undefined}> = ({story}) => {
  return <Text style={styles.listHeaderTextStyle}>{story?.title}</Text>;
};

const Footer: React.FC<{loading: boolean}> = ({loading}) => {
  if (!loading) {
    return null;
  }

  return (
    <View style={styles.footer}>
      <CircularProgress size={'large'} />
    </View>
  );
};

const CommentsList = () => {
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();

  const {states, story, nextPageToken, loading} =
    useAppSelector(selectComments);

  const setPageTokenCallback = React.useCallback(() => {
    if (loading || !nextPageToken) {
      return;
    }

    dispatch(nextComments(nextPageToken));
  }, [nextPageToken, loading, dispatch]);

  const renderItem = React.useCallback<ListRenderItem<CommentViewState>>(
    ({item, index}) => <CommentItem key={index} state={item} />,
    [],
  );

  return (
    <FlatList
      data={states}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={setPageTokenCallback}
      contentContainerStyle={[
        styles.contentContainerStyle,
        {
          paddingBottom: insets.bottom + 8,
          paddingStart: insets.left,
          paddingEnd: insets.right,
        },
      ]}
      ListHeaderComponentStyle={styles.listHeaderComponentStyle}
      ListHeaderComponent={<Header story={story} />}
      ListFooterComponent={<Footer loading={loading || !!nextPageToken} />}
    />
  );
};

export default CommentsList;
