const db = require("../db");
const { OpenAI } = require("openai");
const { getUserOnboardingContext } = require("./OnboardingService"); // 💡 import context
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const responses = [
  "Take a deep breath. What's on your mind?",
  "Let's break it down. What feels most urgent?",
  "That makes sense. What's one small step you can take today?"
];

async function startJournal(user_id, title, first_message) {
  try {
    const [testResult] = await db.execute("SELECT 1 + 1 AS test");
    console.log("Database Test Query Result:", testResult);

    const journalResult = await db.execute(
      "INSERT INTO journal_entries (user_id, title) VALUES (?, ?)",
      [user_id, title]
    );

    const insertData = journalResult[0] || journalResult;
    const journalId = insertData.insertId;
    if (!journalId) throw new Error("Journal entry not created. Possible database issue.");

    await db.execute(
      "INSERT INTO journal_conversations (journal_id, sender, message) VALUES (?, 'user', ?)",
      [journalId, first_message]
    );

    const systemResponse = await generateAIResponse(user_id, first_message);
    await db.execute(
      "INSERT INTO journal_conversations (journal_id, sender, message) VALUES (?, 'system', ?)",
      [journalId, systemResponse]
    );

    return {
      journalId,
      messages: [
        { sender: "user", message: first_message },
        { sender: "system", message: systemResponse },
      ],
    };
  } catch (error) {
    console.error("Error in startJournal:", error);
    throw new Error("Failed to start journal: " + error.message);
  }
}

async function addMessage(journal_id, user_message) {
  try {
    // Get the user_id from the journal entry
    const [rows] = await db.execute("SELECT user_id FROM journal_entries WHERE id = ?", [journal_id]);
    const user_id = rows[0]?.user_id;
    if (!user_id) throw new Error("User ID not found for this journal.");

    await db.execute(
      "INSERT INTO journal_conversations (journal_id, sender, message) VALUES (?, 'user', ?)",
      [journal_id, user_message]
    );

    const systemResponse = await generateAIResponse(user_id, user_message);
    await db.execute(
      "INSERT INTO journal_conversations (journal_id, sender, message) VALUES (?, 'system', ?)",
      [journal_id, systemResponse]
    );

    return [
      { sender: "user", message: user_message },
      { sender: "system", message: systemResponse }
    ];
  } catch (error) {
    throw new Error("Failed to process journal response: " + error.message);
  }
}

async function getJournal(journal_id) {
  try {
    const [journal] = await db.execute("SELECT * FROM journal_entries WHERE id = ?", [journal_id]);
    if (journal.length === 0) throw new Error("Journal not found");

    const [messages] = await db.execute(
      "SELECT sender, message FROM journal_conversations WHERE journal_id = ? ORDER BY created_at ASC",
      [journal_id]
    );

    return { journal_id, title: journal[0].title, messages };
  } catch (error) {
    throw new Error("Failed to retrieve journal: " + error.message);
  }
}

function getSystemResponse() {
  return responses[Math.floor(Math.random() * responses.length)];
}

async function generateAIResponse(user_id, user_message) {
  try {
    const context = await getUserOnboardingContext(user_id);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
You are a thoughtful journaling assistant.

This user has shared the following background:
${context}

Your task is to offer brief, emotionally supportive, insightful reflections on what they say. 
Keep it under 300 characters. Always end with a reflective question. You are an emotional support companion, speak in character as an anthro character.
          `.trim()
        },
        { role: "user", content: user_message }
      ],
      max_tokens: 100
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error(" OpenAI API Error:", error);
    return `Error: ${error.message}`;
  }
}

module.exports = {
  startJournal,
  addMessage,
  getJournal,
  getSystemResponse
};
