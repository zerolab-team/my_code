const path = require('path');

const { compilerOptions } = require('./jsconfig.json');

const aliases = Object.fromEntries(
  Object.entries(compilerOptions.paths).map(([key, value]) => {
    key = key.slice(0, -2);
    value = value[0].slice(0, -1);

    return [key, path.resolve(__dirname, `src/${value}`)];
  }),
);

module.exports = {
  webpack: {
    alias: aliases,
  },
  style: {
    postcss: {
      mode: 'file',
    },
  },
  babel: {
    plugins: [
      [
        'babel-plugin-styled-components',
        {
          displayName: true,
          fileName: true,
        },
      ],
      'effector/babel-plugin',
    ],
  },
};
