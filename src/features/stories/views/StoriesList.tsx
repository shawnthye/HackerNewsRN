import React from 'react';
import {
  FlatList,
  Linking,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CircularProgress from '../../../core-components/CircularProgress';
import {useAppDispatch, useAppSelector} from '../../../core-store/hooks';
import {colors} from '../../../core-theme';
import {nextStories, selectStories} from '../domain/stories-slice';
import StoryItem, {ToComments, ToHtml, ToUrl} from './StoryItem';

const styles = StyleSheet.create({
  buttonBar: {
    flex: 1,
    flexDirection: 'row',
  },
  separator: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,.12)',
  },
  footer: {
    paddingVertical: 12,
  },
});

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

const ItemSeparatorComponent = () => {
  return <View style={styles.separator} />;
};

const keyExtractor = (story: HackerNewsItem) => `${story.id}`;

const toUrl: ToUrl = async url => {
  if (!(await InAppBrowser.isAvailable())) {
    if (await Linking.canOpenURL(url)) {
      Linking.openURL(url);
    }
    return;
  }

  InAppBrowser.open(url, {
    //ios options
    modalEnabled: true,
    // android options
    // we can have more favor to our Theme, but lets respect the user content to keep it as default
    // toolbarColor: colors.primary,
  });
};

const StoryItemMemo = React.memo(StoryItem);

const StoriesList: React.FC<{
  onRefresh: () => void;
  refreshing: boolean;
}> = ({onRefresh, refreshing = false}) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();

  const {stories, loading, nextPageToken} = useAppSelector(selectStories);

  const setPageTokenCallback = React.useCallback(() => {
    if (loading || !nextPageToken) {
      return;
    }

    dispatch(nextStories(nextPageToken));
  }, [nextPageToken, loading, dispatch]);

  const toComments = React.useCallback<ToComments>(
    (storyId: number) => {
      navigation.navigate('Comments', {storyId: storyId});
    },
    [navigation],
  );

  const toHtml = React.useCallback<ToHtml>(
    id => {
      navigation.navigate('StoryHtml', {id: id});
    },
    [navigation],
  );

  const renderItem = React.useCallback<ListRenderItem<HackerNewsItem>>(
    ({item, index}) => (
      <StoryItemMemo
        toUrl={toUrl}
        toHtml={toHtml}
        toComments={toComments}
        index={index}
        story={item}
      />
    ),
    [toComments, toHtml],
  );

  return (
    <FlatList
      contentContainerStyle={{
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
        paddingStart: insets.left,
        paddingEnd: insets.right,
      }}
      data={stories}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={setPageTokenCallback}
      ItemSeparatorComponent={ItemSeparatorComponent}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressViewOffset={insets.top + 40}
          progressBackgroundColor={colors.primary}
          colors={[colors.onPrimary]}
        />
      }
      ListFooterComponent={<Footer loading={loading || !!nextPageToken} />}
    />
  );
};

export default StoriesList;
