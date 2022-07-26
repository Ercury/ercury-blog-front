import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
/* 自动导入ui库,内置了很多流行库解析器(ElementPlus Ant Design Vue Vant ElementUI....) */
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';
import * as _ from 'lodash';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      //ui库解析器,也可以自定义
      resolvers: [
        AntDesignVueResolver(),
        ElementPlusResolver(),
      ]
    })
  ],

  css: {
    preprocessorOptions: {
      less: {
        // vitebug 没用
        // additionalData: '@import "@/assets/style/global.less";'
      }
    }
  },

  /**
   * 在生产中服务时的基本公共路径。
   * @default '/'
   */
  base: './',
  /**
  * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
  * @default 'dist'
  */
  // outDir: 'dist',
  server: {
    // hostname: '0.0.0.0',
    host: "localhost",
    port: 3000,
    // // 是否自动在浏览器打开
    open: true,
    // // 是否开启 https
    https: false,
    // // 服务端渲染
    // ssr: false,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3001/',
    //     changeOrigin: true,
    //     ws: true,
    //     rewrite: (pathStr) => pathStr.replace('/api', '')
    //   },
    // },
  },
  resolve: {
    // 导入文件夹别名
    alias: {
      '@': resolve(__dirname, './src')
    },
  }
})

// 第二步 根据不同环境 去读取 不同的 对象  进行返回
const envResolve = (mode) => {
  return loadEnv(mode, process.cwd());
};

// 第三步 传 要读取的 参数 key
const getEnv = function (env) {
  //           我这里采用了lodash 读取 环境名
  return envResolve(_.last(process.argv))[env];
};
// 第四步 使用
getEnv('VITE_APP_MODULE');
