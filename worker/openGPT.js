const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// API-DOC: https://beta.openai.com/docs/api-reference/completions/create?lang=node.js
//console.log("AI-Key: " + process.env.OPENAI_API_KEY)

const openGPT = {

    getAvailableModels: async function () {
        try {
            const response = await openai.listModels()
            //console.log(response.data)
            return JSON.stringify(response.data)
        } catch (error) {
            if (error.response) {
                console.log("OpenAI Response: " + error.response.status);
                console.log(error.response.data.error.code)
                throw new Error(`AI: Status: ${error.response.data.error.code}`)
            } else {
                console.log("Error on server side: " + error)
                throw new Error(`Server Side Error: ${error}`)
            }
        }
    },
    translateText: async function (text, fromLanguage, toLanguage) {
        const response = await openai.Language.create({
            prompt: `Translate "${text}" from ${fromLanguage} to ${toLanguage}`,
            engine: "text-davinci-002",
        });
        return response.choices[0].text;
    },

    runCompletion: async function (question, numberOfTokens) {
        try {
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: question,
                "max_tokens": numberOfTokens,
                "top_p": 1,
                "n": 1,
                "stream": false,
                "logprobs": null
            });
            //console.log("runCompletion: " + completion.data.choices[0].text)
            return completion.data.choices[0].text
        } catch (error) {
            console.log(error)
            if (error.response) {
                console.log("resp" + error.response.status);
                throw new Error(`AI: Status: ${error.response.data.error.code}`)
            } else {
                 console.log("Error on server side: " + error)
                throw new Error(`Server Side Error: ${error}`)
            }


        }
    },
    createImage: async function (_prompt) {
        try {
            const completion = await openai.createImage({
                prompt: "christmas tree",
                "size": "1024x1024",
                "n": 2,
            });
            console.log("createImage: " + completion.data.choices[0].text)
            return completion.data.choices[0].text
        } catch (error) {
            if (error.response) {
                console.log("resp" + error.response.status);
                console.log(error.response.data);
                return "Engine does not work"
            } else {
                console.log("!response" + error.message);
                return "Engine does not work"
            }


        }
    }
}

module.exports = openGPT