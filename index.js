import './src/polyfills';
import {AppRegistry} from 'react-native';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import {name as appName} from './app.json';
import App from './src/app/App';

TimeAgo.addDefaultLocale(en);
TimeAgo.setDefaultLocale('en-US');

AppRegistry.registerComponent(appName, () => App);
