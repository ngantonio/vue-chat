module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/assets/styles/sass/app.scss";
            `,
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        // eslint-disable-next-line no-param-reassign
        options.compilerOptions.preserveWhitespace = true;
        return options;
      });
  },
  productionSourceMap: false,
  lintOnSave: false,
  pluginOptions: {},

};
