# 关于Fine-tuning调研

#### 不用Fine-tuning如何执行？
基于向量数据库索引基础数据，提问时查询问题类似的向量元素作为prompt,和问题打包后依次传给LLMs处理。

#### 优势(by openAI)
- 比提示设计具有更高的质量结果
- 能够训练更多不能适合提示的例子
- 由于提示更短，可以节省令牌
- 更低延迟的请求

#### 目前支持用户执行Fine-tuning的LLMs?
- ChatGPT([gpt-3.5-turbo-0613、babbage-002、davinci-002](https://platform.openai.com/docs/guides/fine-tuning))
- 文心一言([可在千帆大模型平台-模型精调进行训练](https://console.bce.baidu.com/qianfan/train/sft/13159/train))

#### Fine-tuning流程
- 准备数据集
- 上传训练文件(数据集jsonl文件)
- 创建基于训练文件的模型开始训练
- 使用训练好的模型提问即可

#### 如何将文档转化成数据集文件
- 通过langchain读取文档
- 将文档split
- 调用LLM自动生成数据集格式的数据并返回

#### 自动转化文档可能会遇到的问题
- 文档split不准确
- LLM生成的数据集内容有误
