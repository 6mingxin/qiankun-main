const { defineConfig } = require('@vue/cli-service')
const { NaiveUiResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      require('unplugin-auto-import/webpack')({
        imports: ['vue', 'vue-router', 'pinia'],
        // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
        dts: false,
        // eslint报错解决
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
      require('unplugin-vue-components/webpack')({
        // 指定组件位置，默认是src/components
        dirs: ['src/components'],
        // ui库解析器
        resolvers: [NaiveUiResolver()], //, VantResolver()
        extensions: ['vue'],
        // ts配置文件生成位置
        dts: false,
      }),
    ],
  },
})
