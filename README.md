# embedding-docs

纯静态的 **EMRank** 使用指南站点，覆盖向量嵌入、重排序、结构化决策、计费和完整模型 ID 规则。

已迁移至 Rspress，文档入口在 `docs/index.mdx`（可写 Markdown/MDX）。

## 开发

```bash
bun install --frozen-lockfile
bun run dev
```

## 构建

```bash
bun run build
# 或：./build.sh
```

产物输出到 `dist/`。

Cloudflare Pages 的 `embedding-docs` 项目跟随 GitHub `main` 分支自动发布，默认地址为 `https://embedding-docs.pages.dev`。站点维护者自行绑定 `docs.emrank.tech`；文档内部使用相对路径，无需绑定后再次构建。控制台与 API 使用 `https://emrank.tech`，状态页使用 `https://status.emrank.tech`。

模型及倍率以主站实时目录为准，文档不复制一份静态清单。修改接口行为时同步检查相关文档与示例。

`patches/` 中的 Rspress 1.47 runtime 补丁使服务端与客户端初始窗口尺寸一致，再以 React transition 更新实际尺寸，修复手机刷新时的 hydration 错误。必须使用 Bun 的锁定安装以应用补丁。升级 Rspress 后应在桌面与手机宽度重新检查首次加载和刷新。
