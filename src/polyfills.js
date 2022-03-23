import {LogBox} from 'react-native';
import 'react-native-gesture-handler';

LogBox.ignoreLogs([
  /**
   * @see https://github.com/software-mansion/react-native-gesture-handler/issues/1831
   */
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
