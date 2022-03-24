'use strict';

const {androidEmulator} = require('../../config/paths');

const {execSync} = require('child_process');

const platform = {
  ANDROID: 'ANDROID',
  IOS: 'IOS',
};

// function listDevices() {
//   try {
//     const result = execSync(`${androidADB} devices`, {encoding: 'utf8'});
//     if (!result) {
//       return [];
//     }
//
//     const lines = result.trim().split(/\r?\n/);
//     const devices = [];
//
//     for (let i = 0; i < lines.length; i++) {
//       let words = lines[i].split(/[ ,\t]+/).filter(w => w !== '');
//
//       if (words[1] === 'device') {
//         devices.push(words[0]);
//       }
//     }
//     return devices;
//   } catch (e) {
//     return [];
//   }
// }

function list() {
  try {
    const result = execSync(`${androidEmulator} -list-avds`, {
      encoding: 'utf8',
    });
    if (!result) {
      return [];
    }

    const lines = result.trim().split(/\r?\n/);
    const devices = [];
    for (let i = 0; i < lines.length; i++) {
      devices.push(lines[i].trim());
    }
    return devices;
  } catch (e) {
    return [];
  }
}

const AVDs = {
  list: list,
  platform: platform,
};

module.exports = AVDs;
