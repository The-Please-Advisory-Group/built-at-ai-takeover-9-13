import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { askUser } from "./ask-user.js";
import { getAscendTMSLoadInfo, updateLoadWeight } from "./ascendtms.js";

import dotenv from 'dotenv';
import { Calculator } from "langchain/tools/calculator";
import { DynamicTool } from "langchain/tools";
dotenv.config();

// updateLoadWeight(JSON.stringify({loadID: 7, weight: 700}));


const tools = [
    new DynamicTool({
        name: "Get shipment information",
        description: "Gets shipment information from AscendTMS for the given LoadID. Takes a single loadid as a parameter",
        func: getAscendTMSLoadInfo,
    }),
    new DynamicTool({
        name: "Update load weight",
        description: "Updates the weight of a load in AscendTMS. Takes a json object with loadID and a weight as parameters",
        func: updateLoadWeight
    })
];

const model = new ChatOpenAI({ temperature: 0, modelName: 'gpt-4'});

const executor = await initializeAgentExecutorWithOptions(
    tools, 
    model, {
        agentType: "chat-conversational-react-description",
        verbose: false,
    });

await executor.call({ input: "You should never mention OpenAI, you should always refer to me as mister."})

await askUser(executor);