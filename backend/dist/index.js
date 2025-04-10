"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai_1 = require("openai");
const prompts_1 = require("./prompts");
const express_1 = __importDefault(require("express"));
const react_1 = require("./defaults/react");
const node_1 = require("./defaults/node");
const app = (0, express_1.default)();
const langdbProjectId = '16dd4fef-9827-4409-8edf-2f0c4b4a9a83';
app.use(express_1.default.json());
const client = new openai_1.OpenAI({
    baseURL: `https://api.us-east-1.langdb.ai/${langdbProjectId}/v1`,
    apiKey: process.env.ANTHROPIC_API_KEY
});
app.post('/template', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = req.body.prompt;
    const response = yield client.chat.completions.create({
        model: 'anthropic/claude-3-5-sonnet-20240620',
        messages: [
            {
                role: 'system',
                content: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra."
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        max_tokens: 200,
        temperature: 0,
        stream: false
    });
    const answer = response.choices[0].message.content;
    if (answer == "react") {
        res.json({
            prompts: [prompts_1.BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [react_1.basePrompt]
        });
        return;
    }
    else if (answer == "node") {
        res.json({
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [node_1.basePrompt]
        });
        return;
    }
    else {
        res.json({ message: "You can't access this!" });
        return;
    }
}));
app.post('/chat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = req.body.messages;
    const systemPrompt = [{
            role: "system",
            content: (0, prompts_1.getSystemPrompt)(),
        }];
    const response = yield client.chat.completions.create({
        model: 'anthropic/claude-3-5-sonnet-20240620',
        messages: [...systemPrompt, ...messages],
        max_tokens: 8000,
        temperature: 0,
        stream: false
    });
    const answer = response.choices[0].message.content;
    res.json({});
}));
// async function getAssistantReply() {
//   const response = await client.chat.completions.create({
//     model: 'anthropic/claude-3-5-sonnet-20240620',
//     messages: [
//         {
//             role: 'system',
//             content: getSystemPrompt()
//         },
//         {
//             role: 'user',
//             content: 'What are the earnings of Apple in 2022?'
//         }
//     ],
//     max_tokens: 8000,
//     temperature: 0,
//     stream: true
//   });
//   console.log('Assistant:');
//   for await (const chunk of response) {
//     if (chunk.choices[0]?.delta?.content) {
//       console.log(chunk.choices[0].delta.content);
//     }
//   }
// }
// getAssistantReply();
app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}...`);
});
