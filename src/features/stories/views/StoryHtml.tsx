import React from 'react';
import {StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {useAppSelector} from '../../../core-store/hooks';
import {selectStory} from '../data/stories-slice';

type RouteProps = RouteProp<StackParamList, 'StoryHtml'>;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

const StoryHtml = () => {
  const {
    params: {id},
  } = useRoute<RouteProps>();

  const story = useAppSelector(state => selectStory(state, id));

  return (
    <SafeAreaView style={styles.screen}>
      <WebView source={{html: story!.text}} textZoom={200} />
    </SafeAreaView>
  );
};

export default StoryHtml;
