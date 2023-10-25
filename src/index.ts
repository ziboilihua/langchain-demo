import { loadQARefineChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";
import { DocxLoader } from "langchain/document_loaders/fs/docx";

export async function index() {
    // Create the models and chain
    const model = new OpenAI({ temperature: 0 });
    const chain = loadQARefineChain(model);
    // Load the documents
    const loader = new DocxLoader(
        "test.docx"
    );
    const docs = await loader.load();
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
    });
    const output = await splitter.splitDocuments(docs);
    // Load the docs into the vector store
    const store = await MemoryVectorStore.fromDocuments(
        output,
        new OpenAIEmbeddings()
    );
    // Select the relevant documents
    const question = "存储媒体是什么?";
    const relevantDocs = await store.similaritySearch(question);

    // Call the chain
    const res = await chain.call({
        input_documents: relevantDocs,
        question,
    });

    console.log(res);
}

index()
