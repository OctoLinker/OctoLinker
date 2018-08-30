const fs = require('fs');

function eslintReporter() {
  const eslintOutput = './eslint.json';

  if (!fs.existsSync(eslintOutput)) {
    return;
  }

  const output = JSON.parse(fs.readFileSync(eslintOutput).toString());

  output.forEach(items => {
    if (items.messages.length) {
      items.messages.forEach(item => {
        const reportLevel = item.severity === 2 ? fail : warn;
        const filePath = items.filePath.replace(
          '/home/travis/build/OctoLinker/OctoLinker/',
          '',
        );
        reportLevel(item.message, filePath, item.line);
      });
    }
  });
}

eslintReporter();
