module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['defaults'],
    },
    cssnano: {
      zindex: false,
      reduceIdents: false,
    },

    'postcss-flexbugs-fixes': {},
  },
};
