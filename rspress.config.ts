import { defineConfig } from 'rspress/config';
import { pluginShiki } from '@rspress/plugin-shiki';

export default defineConfig({
  plugins: [pluginShiki()],
  root: 'docs',
  title: 'Embedding & Reranker',
  description:
    'OpenAI 兼容的 Embeddings / Rerank 使用指南：base_url、api_key、模型列表与多语言调用示例。',
  icon: '/favicon.svg',
  logo: '/favicon.svg',
  outDir: 'dist',
  themeConfig: {
    nav: [
      {
        text: '用户指南',
        items: [
          { text: '快速开始', link: '/guide/quickstart' },
          { text: '可用模型', link: '/guide/models' },
          { text: '代码示例', link: '/guide/examples' },
        ],
      },
      {
        text: '场景示例',
        items: [
          { text: 'KiloCode', link: '/scenarios/kilocode' },
          { text: 'RAGFlow', link: '/scenarios/ragflow' },
          { text: 'AstrBot 知识库', link: '/scenarios/astrbot-kb' },
        ],
      },
      {
        text: 'API 手册',
        items: [
          { text: '创建嵌入请求', link: '/api/embeddings' },
          { text: '创建重排序请求', link: '/api/rerank' },
        ],
      },
      { text: '状态检测', link: 'https://status-router.tumuer.me/' },
    ],
  },
});
