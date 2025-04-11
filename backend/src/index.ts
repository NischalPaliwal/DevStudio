import dotenv from 'dotenv';
dotenv.config();
import { OpenAI } from "openai";
import { getSystemPrompt, BASE_PROMPT } from "./prompts";
import express from "express";
import { basePrompt as reactBasePrompt } from "./defaults/react";
import { basePrompt as nodeBasePrompt } from "./defaults/node";
import cors from "cors";

const app = express();
const langdbProjectId = '16dd4fef-9827-4409-8edf-2f0c4b4a9a83';

app.use(express.json());
app.use(cors());

const client = new OpenAI({
  baseURL: `https://api.us-east-1.langdb.ai/${langdbProjectId}/v1`,
  apiKey:  process.env.ANTHROPIC_API_KEY
});

app.post('/template', async (req, res) => {
    const prompt = req.body.prompt;
    const response = await client.chat.completions.create({
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
            prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [reactBasePrompt]
        });
        return;
      }

      else if (answer == "node") {
        res.json({
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [nodeBasePrompt]
        });
        return;
      }

      else {
        res.json({ message: "You can't access this!" });
        return;
      }
});

app.post('/chat', async (req, res) => {
    const messages = req.body.messages;
    const systemPrompt = {
        role: "system",
        content: getSystemPrompt(),
    };
    const response = await client.chat.completions.create({
        model: 'anthropic/claude-3-5-sonnet-20240620',
        messages: [systemPrompt, ...messages],
        max_tokens: 4096,
        temperature: 0,
        stream: true
      });

      for await (const chunk of response) {
        if (chunk.choices[0]?.delta?.content) {
        console.log(chunk.choices[0].delta.content);
        }
      }
      res.json({});
});

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