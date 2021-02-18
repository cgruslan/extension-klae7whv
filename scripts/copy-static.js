require('fs-extra').copySync(
  `${__dirname}/../static`,
  `${__dirname}/../dist`,
);
