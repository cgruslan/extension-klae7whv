const fs = require('fs-extra');
const R = require('ramda');

const aRaw = fs.readFileSync('./a.txt', { encoding: 'utf8' });
const bRaw = fs.readFileSync('./b.txt', { encoding: 'utf8' });

const a = R.compose(
  R.filter(Boolean),
  R.map(R.toLower),
  R.split('\n'),
)(aRaw);

const b = R.compose(
  R.filter(Boolean),
  R.map(R.toLower),
  R.split('\n'),
)(bRaw);

fs.writeFileSync(
  './diff.txt',
  R.difference(b, a).join('\n'),
);
