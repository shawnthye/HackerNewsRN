const del = require('del');
const {argv} = require('yargs');

const dryRun = false;

(async () => {
  const [...paths] = argv._;
  const deletedPaths = paths.reduce((result, path) => {
    return result.concat(...del.sync([path], {dryRun: argv.dryRun || dryRun}));
  }, []);

  console.log('\nDeleted:', deletedPaths ? deletedPaths.length : 0);
  if (deletedPaths && deletedPaths.length) {
    console.log(deletedPaths.join('\n'), '\n');
  }
})();
