import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join, resolve } from 'path'
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ reactivityTransform: true }),
    dts({
      outDir: ['es', 'lib', 'dist/@types'],
      tsconfigPath: join(__dirname, './tsconfig.json'),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.ts', '.vue', '.json']
  },
  build: {
    // outDir: 'dist',

    lib: {
      entry: './src/index.ts', //指定组件编译入口文件
      name: 'vue-spine',
      fileName: 'vue-spine', // 打包后的文件名
      formats: ['es', 'umd', 'cjs'],
    }, //库编译模式配置项
    rollupOptions: {
      external: ["vue"],
      input: './src/index.ts',
      output: [
        {
          format: "es", //指定打包格式
          entryFileNames: "[name].mjs", //指定输出文件名
          preserveModules: true, //保留原目录结构
          exports: "named", //指定导出方式
          dir: "es",   //配置打包根目录
        },
        {
          format: "cjs",
          entryFileNames: "[name].js",
          preserveModules: true,
          exports: "named",
          dir: "lib",
        }
      ]
    },
  }
})
