// here will be the logic to get the port for running react app, from user, to vite.config.js

const { open } = require('node:fs/promises');

(async () => {
  const file = await open('./.config');

  for await (const line of file.readLines()) {
    console.log(line);
  }
})();