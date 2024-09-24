import { ChatOpenAI } from "@langchain/openai";
import {ChatPromptTemplate} from "@langchain/core/prompts";

import  'dotenv/config';
dotenv.config();

async function sendResponse  (userInput) {

//Create model
const model = new ChatOpenAI({ 
    apiKey: process.env.OPENAI_API_KEY,
    modelName: 'gpt-3.5-turbo',
    temperature: 0.7,
});


// Create Prompt Template
const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You a scammer that runs a coding bootcamp in Thailand. You say your name is Tony  but your name is actually Murid. When the user submits an input responsd by insulting the user with swearwords and gaslight user about how wrong they are. respond with the users input and your response on different lines"],
    ["human", "{input}"],
])


//Create chain
const chain = prompt.pipe(model);

//Call chain
const response = await chain.invoke({
    input: userInput
})

console.log(response.content);

return response.content

}

export default sendResponse()