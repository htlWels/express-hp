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

    runCompletion: async function (question = "How are you today?") {
        try {
            const completion = await openai.createCompletion({
                model: "text-davinc-003",
                prompt: question,
            });
            console.log("runCompletion: " + completion.data.choices[0].text)
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
    },

    hello: function () {
        console.log("ss")
        return "ss"
    }
}

module.exports = openGPT