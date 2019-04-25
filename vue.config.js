module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .options({
        fix: true
      })
  }
}
