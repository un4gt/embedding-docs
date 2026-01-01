import './App.css';
import { CodeTabs, type CodeSample } from './components/CodeTabs';
import { CopyButton } from './components/CopyButton';

const BASE_URL = 'https://router.tumuer.me/v1';
const MODELS = [
  'embedding-001',
  'gemini-embedding-exp-03-07',
  'text-embedding-004',
  'text-embedding-3-large',
  'text-embedding-3-small',
  'text-embedding-ada-002',
] as const;

const MODEL_LIST_TEXT = MODELS.map((model) => `- ${model}`).join('\n');

const CODE_SAMPLES: CodeSample[] = [
  {
    id: 'python-openai',
    label: 'Python（openai SDK）',
    language: 'Python',
    code: `from openai import OpenAI
import os

client = OpenAI(
    base_url="${BASE_URL}",
    api_key=os.environ["OPENAI_API_KEY"],  # 在控制台生成
)

models = [
    "embedding-001",
    "gemini-embedding-exp-03-07",
    "text-embedding-004",
    "text-embedding-3-large",
    "text-embedding-3-small",
    "text-embedding-ada-002",
]

for model in models:
    print("current_model", model)
    response = client.embeddings.create(
        model=model,
        input="这是一段需要转换成向量的文本",
        encoding_format="float",
    )

    print(response.data[0].embedding[:30])
    print()`,
  },
  {
    id: 'node-openai',
    label: 'Node.js（openai SDK）',
    language: 'TypeScript / JavaScript',
    code: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "${BASE_URL}",
  apiKey: process.env.OPENAI_API_KEY, // 在控制台生成
});

const models = [
  "embedding-001",
  "gemini-embedding-exp-03-07",
  "text-embedding-004",
  "text-embedding-3-large",
  "text-embedding-3-small",
  "text-embedding-ada-002",
];

for (const model of models) {
  console.log("current_model", model);
  const response = await client.embeddings.create({
    model,
    input: "这是一段需要转换成向量的文本",
    encoding_format: "float",
  });

  console.log(response.data[0].embedding.slice(0, 30));
  console.log("");
}`,
  },
  {
    id: 'python-requests',
    label: 'Python（requests）',
    language: 'Python',
    code: `import os
import requests

url = "${BASE_URL}/embeddings"

headers = {
    "Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}",
    "Content-Type": "application/json",
}

payload = {
    "model": "text-embedding-3-small",
    "input": "这是一段需要转换成向量的文本",
    "encoding_format": "float",
}

response = requests.post(url, headers=headers, json=payload, timeout=60)
response.raise_for_status()
data = response.json()

print(data["data"][0]["embedding"][:30])`,
  },
  {
    id: 'python-httpx',
    label: 'Python（httpx）',
    language: 'Python',
    code: `import os
import httpx

url = "${BASE_URL}/embeddings"

headers = {
    "Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}",
    "Content-Type": "application/json",
}

payload = {
    "model": "text-embedding-3-small",
    "input": "这是一段需要转换成向量的文本",
    "encoding_format": "float",
}

with httpx.Client(timeout=60) as client:
    response = client.post(url, headers=headers, json=payload)
    response.raise_for_status()
    data = response.json()
    print(data["data"][0]["embedding"][:30])`,
  },
  {
    id: 'curl',
    label: 'cURL',
    language: 'Shell',
    code: `curl "${BASE_URL}/embeddings" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "text-embedding-3-small",
    "input": "这是一段需要转换成向量的文本",
    "encoding_format": "float"
  }'`,
  },
];

const App = () => {
  return (
    <div className="app">
      <a className="skipLink" href="#content">
        跳到正文
      </a>

      <header className="top">
        <div className="container">
          <div className="topBar">
            <div className="brand" aria-label="Embedding Docs">
              <span className="brandMark" aria-hidden="true" />
              <span className="brandText">embedding</span>
            </div>

            <nav className="nav" aria-label="页面导航">
              <a href="#quickstart">快速开始</a>
              <a href="#models">模型</a>
              <a href="#examples">示例</a>
              <a href="#kilocode">KiloCode</a>
            </nav>
          </div>

          <div className="hero">
            <div className="heroBadge">OpenAI 兼容 · Embeddings</div>
            <h1>Embedding API 使用指南</h1>
            <p className="heroSubtitle">
              只需要配置 <code>base_url</code>、在控制台生成 <code>api_key</code>、选择模型，然后调用{' '}
              <code>/embeddings</code> 即可。
            </p>

            <div className="heroPanel" role="group" aria-label="快速配置">
              <div className="kv">
                <div className="kvKey">Base URL</div>
                <div className="kvValue">
                  <code className="inlineCode">{BASE_URL}</code>
                  <CopyButton
                    value={BASE_URL}
                    ariaLabel="复制 Base URL"
                    className="kvCopy"
                    label="复制"
                  />
                </div>
                <div className="kvHint">
                  注意：这里已包含 <code>/v1</code>，完整接口为 <code>{BASE_URL}/embeddings</code>。
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main id="content" className="main">
        <div className="container">
          <section className="section" id="quickstart">
            <h2>快速开始</h2>
            <div className="grid">
              <div className="card">
                <div className="cardTitle">1）配置 base_url</div>
                <div className="cardBody">
                  SDK / HTTP 请求统一使用 <code className="inlineCode">{BASE_URL}</code>。
                </div>
              </div>

              <div className="card">
                <div className="cardTitle">2）从控制台生成 api_key</div>
                <div className="cardBody">
                  建议以环境变量保存：<code className="inlineCode">OPENAI_API_KEY</code>。
                </div>
              </div>

              <div className="card">
                <div className="cardTitle">3）选择 model</div>
                <div className="cardBody">
                  从下方 “可用模型” 中选择其一；通用推荐{' '}
                  <code className="inlineCode">text-embedding-3-small</code>。
                </div>
              </div>

              <div className="card">
                <div className="cardTitle">4）调用 /embeddings</div>
                <div className="cardBody">
                  发送 <code className="inlineCode">input</code>，返回向量数组；可选{' '}
                  <code className="inlineCode">encoding_format: "float"</code>。
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="models">
            <div className="sectionHeader">
              <h2>可用模型</h2>
              <CopyButton value={MODEL_LIST_TEXT} ariaLabel="复制模型列表" label="复制列表" />
            </div>
            <ul className="modelList" aria-label="模型列表">
              {MODELS.map((model) => (
                <li key={model} className="modelItem">
                  <code className="inlineCode">{model}</code>
                </li>
              ))}
            </ul>
            <p className="note">
              选择建议：追求效果可选 <code className="inlineCode">text-embedding-3-large</code>；追求速度与成本可选{' '}
              <code className="inlineCode">text-embedding-3-small</code>。
            </p>
          </section>

          <section className="section" id="examples">
            <h2>代码示例</h2>
            <p className="note">
              SDK 示例只需要把 <code className="inlineCode">base_url</code> 指向上方地址，并填入控制台生成的{' '}
              <code className="inlineCode">api_key</code>；其余调用方式与 OpenAI 官方接口一致。
            </p>
            <CodeTabs samples={CODE_SAMPLES} />
          </section>

          <section className="section" id="kilocode">
            <h2>KiloCode：用于 Code Index 服务</h2>
            <div className="card">
              <ol className="list">
                <li>
                  打开 KiloCode 的设置页，找到 <span className="em">Code Index / Embeddings</span> 相关配置。
                </li>
                <li>
                  Provider 选择 <span className="em">OpenAI Compatible</span>（或自定义 OpenAI 兼容接口）。
                </li>
                <li>
                  <span className="em">Base URL</span> 填 <code className="inlineCode">{BASE_URL}</code>；<span className="em">API Key</span>{' '}
                  填控制台生成的 Key。
                </li>
                <li>
                  <span className="em">Model</span> 选择上方任意模型（推荐{' '}
                  <code className="inlineCode">text-embedding-3-small</code>），保存后重新构建索引。
                </li>
              </ol>
            </div>
            <div className="callout" role="note">
              不要把 API Key 写进浏览器前端代码；前端直连会暴露 Key。用于索引、后端或本地工具更安全。
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container footerInner">
          <div className="footerText">OpenAI-compatible Embeddings · {BASE_URL}</div>
          <a className="footerLink" href="#content">
            回到顶部
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
