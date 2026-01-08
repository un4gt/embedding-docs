import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: 'Embedding API 使用指南',
    favicon: './public/favicon.svg',
    meta: {
      'theme-color': '#f7f8ff',
      description: 'OpenAI 兼容的 Embeddings 使用指南：base_url、api_key、模型列表与多语言调用示例。',
    },
  },
});
