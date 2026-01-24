import { defineConfig } from 'rspress/config';
import { pluginShiki } from '@rspress/plugin-shiki';

export default defineConfig({
  plugins: [pluginShiki()],
  root: 'docs',
  title: 'Embedding API 使用指南',
  description: 'OpenAI 兼容的 Embeddings 使用指南：base_url、api_key、模型列表与多语言调用示例。',
  icon: '/favicon.svg',
  logo: '/favicon.svg',
  outDir: 'dist',
  themeConfig: {
    nav: [
      { text: '快速开始', link: '/#quickstart' },
      { text: '模型', link: '/#models' },
      { text: '示例', link: '/#examples' },
      { text: 'KiloCode', link: '/#kilocode' },
      { text: 'RAGFlow', link: '/#ragflow' },
      { text: 'AstrBot 知识库', link: '/#astrbot-kb' },
      { text: '状态检测', link: 'https://status-router.tumuer.me/' },
    ],
  },
});
