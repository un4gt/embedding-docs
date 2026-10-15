import { defineConfig } from 'rspress/config';
import { pluginShiki } from '@rspress/plugin-shiki';

export default defineConfig({
  plugins: [pluginShiki()],
  root: 'docs',
  title: 'EMRank 文档',
  description:
    '向量嵌入、重排序、结构化决策与计费使用指南。',
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
          { text: '完整模型 ID', link: '/guide/model-ids' },
          { text: '计费与额度', link: '/guide/billing' },
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
          { text: '创建决策请求', link: '/api/decisions' },
          { text: 'Gemini 文本嵌入', link: '/api/gemini' },
        ],
      },
      { text: '控制台', link: 'https://emrank.tech/' },
      { text: '状态检测', link: 'https://status.emrank.tech/' },
    ],
  },
});
