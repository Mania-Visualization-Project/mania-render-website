const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

(() => {
  try {
    const dir = path.join(__dirname, '..', 'build/mania');
    const targetDir = path.join(__dirname, '..', 'dist');
    if (fs.pathExistsSync(dir)) {
      fs.copySync(dir, targetDir);
      console.log(chalk.bgGreen('SUCCESS'), chalk.green('successfully move dist/mania/assets to dist/assets'));
    } else {
      console.log(chalk.bgRed.whiteBright('ERROR'), chalk.red('../dist/mania/assets not exist'));
    }
  } catch (err) {
    console.log(chalk.red(err));
  }
})();