'use strict';

const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// config after eject: we're in ./config/
module.exports = {
  appDirectory: appDirectory,
  androidDirectory: resolveApp('android'),
  iosDirectory: resolveApp('ios'),
  appSrc: resolveApp('app'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  androidADB: process.env.ANDROID_HOME
    ? path.resolve(process.env.ANDROID_HOME, 'platform-tools', 'adb')
    : 'adb',
  androidEmulator: process.env.ANDROID_HOME
    ? path.resolve(process.env.ANDROID_HOME, 'emulator', 'emulator')
    : 'emulator',
};
