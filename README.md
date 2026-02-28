# embedding-docs

纯静态的 **Embedding & Reranker** 使用指南站点（OpenAI 兼容：`/embeddings` 与 `/rerank`）。

已迁移至 Rspress，文档入口在 `docs/index.mdx`（可写 Markdown/MDX）。

## 开发

```bash
bun install
bun run dev
```

## 构建

```bash
bun run build
# 或：./build.sh
```

产物输出到 `dist/`。
