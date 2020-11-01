module.exports = (env) => ({
  plugins: {
    'postcss-normalize': true,
    'postcss-preset-env': {
      importFrom: ['src/styles/queries.css'],
      autoprefixer: env === 'production',
      stage: 0,
    },
  },
});
