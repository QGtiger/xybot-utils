import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'xybot-utils',
  },
  base: process.env.NODE_ENV === 'production' ? '/xybot-utils' : '/', //
  publicPath: process.env.NODE_ENV === 'production' ? '/xybot-utils/' : '/',
});
