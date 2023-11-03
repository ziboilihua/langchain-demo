# langchain-demo
基于langchain实现基于文档索引，提出问题并返回答案功能

## 索引

### 文档加载器()

langchain封装的用于加载各类文档(无需连接LLMs脱机实现)

### 文本分割器(Text Splitters)

langchain封装用于分割文档(无需连接LLMs脱机实现)


## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Modify openApiKey

Modify OPENAI_API_KEY in package.json

## Start project

```bash
npm run dev
```

or

```
yarn dev
```
