import * as fs from 'fs';
import OpenAI from 'openai';
import {Files} from "openai/resources";
import FileObject = Files.FileObject;
import {Jobs} from "openai/resources/fine-tuning";
import FineTuningJob = Jobs.FineTuningJob;
const openai = new OpenAI();
async function index() {
    const file = 'mydata.jsonl';
    await uploadFile(file);
    const fineTuneFile = await queryUploadSuccessFile(file);
    const fineTuneJob = await createFineTuneJob(fineTuneFile.id)
    const modelId = await waitFineTuneJobSuccess(fineTuneJob.id);
    const completion = await openai.chat.completions.create({
        temperature: 0,
        messages: [{ role: "user", content: "软考难吗?" }],
        model: modelId,
    });
    console.log(completion.choices[0].message.content);
}

async function uploadFile(filePath: string) {
    await openai.files.create({ file: fs.createReadStream(filePath), purpose: 'fine-tune' });
}

async function queryUploadSuccessFile(fileName: string): Promise<FileObject> {
    while (true) {
        const list = await openai.files.list();
        for await (const file of list) {
            if (file.filename === fileName) {
                return file;
            }
        }
    }
}

async function createFineTuneJob(fileId: string): Promise<FineTuningJob> {
    const job = await openai.fineTuning.jobs.create({ training_file: fileId, model: 'gpt-3.5-turbo' });
    return job;
}

async function waitFineTuneJobSuccess(jobId: string): Promise<string> {
    while (true) {
        const job = await openai.fineTuning.jobs.retrieve(jobId);
        if (job.status === 'succeeded') {
            return job.fine_tuned_model;
        }
    }
}

index();
