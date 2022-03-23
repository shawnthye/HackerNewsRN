import React from 'react';
import {StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {useBackHandler} from '@react-native-community/hooks';
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
  const html = `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${
    story!.text
  }</body></html>' }}`;

  const webview = React.useRef<WebView>(null);

  const [webviewCanGoBack, setCanGoBack] = React.useState<boolean>(false);

  useBackHandler(() => {
    if (webviewCanGoBack) {
      webview.current?.goBack();
      return true;
    }

    return false;
  });

  return (
    <SafeAreaView style={styles.screen}>
      <WebView
        ref={webview}
        source={{html: html}}
        onNavigationStateChange={({canGoBack}) => {
          setCanGoBack(canGoBack);
        }}
      />
    </SafeAreaView>
  );
};

export default StoryHtml;
