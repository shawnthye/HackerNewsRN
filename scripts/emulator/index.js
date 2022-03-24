/**
 * @format
 */

'use strict';

const {spawn} = require('child_process');
const inquirer = require('inquirer');
const chalk = require('chalk');
const AVDs = require('./AVDs');

const error = message => {
  // noinspection JSUnresolvedFunction
  return chalk.red(message);
};

const virtualDevices = AVDs.list();

if (!virtualDevices.length) {
  console.log(
    error(
      'No virtual device found, please use Android Studio to setup you AndroidVirtualDevice(AVD)',
    ),
  );
  process.exit(1);
}

const deviceChoices = {
  type: 'list',
  name: 'device',
  message: 'Which emulator?',
  choices: virtualDevices.map(function (value) {
    return {
      // name: `\u2022 ${value}`,
      name: `${value}`,
      value: value,
    };
  }),
  validate: function (answer) {
    if (answer.length) {
      return true;
    } else {
      return 'You must choose at least one device.';
    }
  },
};

inquirer.prompt([deviceChoices]).then(({device}) => {
  console.log(device);
  spawn('emulator', [`@${device}`, '-no-snapshot'], {
    stdio: 'ignore',
    detached: true,
  }).unref();
});
