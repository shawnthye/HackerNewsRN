import React from 'react';
import {StyleSheet} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {useBackHandler} from '@react-native-community/hooks';
import BackButton from '../../../@core-components/BackButton';
import {useAppSelector} from '../../../@core-store/hooks';
import {selectStory} from '../domain/stories-slice';

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

  const webview = React.useRef<WebView>(null);
  const [webviewCanGoBack, setCanGoBack] = React.useState<boolean>(false);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const story = useAppSelector(state => selectStory(state, id));
  const html = `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${
    story!.text
  }</body></html>' }}`;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: props => (
        <BackButton
          {...props}
          onPress={() => {
            if (webviewCanGoBack) {
              webview.current?.goBack();
            } else {
              navigation.goBack();
            }
          }}
        />
      ),
      title: story?.title,
    });
  }, [navigation, story?.title, webviewCanGoBack]);

  useBackHandler(() => {
    if (webviewCanGoBack) {
      webview.current?.goBack();
      return true;
    }

    return false;
  });

  return (
    <SafeAreaView style={styles.screen} edges={['bottom', 'left', 'right']}>
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
