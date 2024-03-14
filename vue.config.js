const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    externals: {
      fs: require("fs"),
    },
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "io.github.blackteam-xingyu.caculator",
        productName: "叉车等效均布荷载计算器",
        win: {
          //win相关配置
          icon: "./icon.ico", //图标，当前图标在根目录下，注意这里有两个坑
          target: [
            {
              target: "nsis", //利用nsis制作安装程序
              arch: [
                "x64", //64位
              ],
            },
          ],
        },
      },
      nodeIntegration: true,
      customFileProtocol: "./",
    },
  },
});
