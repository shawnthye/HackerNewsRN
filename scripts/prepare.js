/**
 * @format
 */

const {spawnSync} = require('child_process');
const chalk = require('chalk');

const paths = require('../config/paths');

const message = msg => {
  // noinspection JSUnresolvedFunction
  return chalk.green(msg);
};

// setup pod if we are using macOS
if (process.platform === 'darwin') {
  console.log(message('Setting up pods for iOS'));

  const bundle = spawnSync('bundle', ['install'], {
    cwd: paths.appDirectory,
    stdio: 'inherit',
  });

  if (bundle.status !== 0) {
    process.exit(bundle.status);
  }

  const install = spawnSync('bundle', ['exec', 'pod', 'install'], {
    cwd: paths.iosDirectory,
    stdio: 'inherit',
  });

  if (install.status !== 0) {
    process.exit(install.status);
  }
} else {
  console.log(message('Non macOS, Skipped pod setup for iOS'));
}
