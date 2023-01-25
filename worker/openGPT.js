const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const openGPT = {

    translateText: async function (text, fromLanguage, toLanguage) {
        const response = await openai.Language.create({
            prompt: `Translate "${text}" from ${fromLanguage} to ${toLanguage}`,
            engine: "text-davinci-002",
        });
        return response.choices[0].text;
    },

    runCompletion: async function () {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "How are you today?",
        });
        console.log("runCompletion: " + completion.data.choices[0].text)
        return completion.data.choices[0].text
    },

    hello: function () {
        console.log("ss")
        return "ss"
    }
}

module.exports = openGPT