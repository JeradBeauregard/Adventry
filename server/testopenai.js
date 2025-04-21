const openai = require("./openaiClient");

async function testOpenAI() {
    try {
        const response = await openai.models.list();
        console.log("Available models:", response);
    } catch (error) {
        console.error("OpenAI API Error:", error);
    }
}

testOpenAI();
