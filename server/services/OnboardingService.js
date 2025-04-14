const db = require("../db");

async function isOnboardingComplete(user_id) {
  const [rows] = await db.execute(
    "SELECT has_completed_onboarding FROM users WHERE id = ?",
    [user_id]
  );
  return rows[0]?.has_completed_onboarding;
}

async function saveOnboardingAnswers(user_id, answers) {
  const query = "INSERT INTO user_onboarding (user_id, question, answer) VALUES ?";
  const formatted = answers.map(({ question, answer }) => [user_id, question, answer]);

  await db.query(query, [formatted]);

  // Flip the completion flag
  await db.execute(
    "UPDATE users SET has_completed_onboarding = TRUE WHERE id = ?",
    [user_id]
  );
}

async function getUserOnboardingContext(user_id) {
  const [rows] = await db.execute(
    "SELECT question, answer FROM user_onboarding WHERE user_id = ?",
    [user_id]
  );

  return rows.map(r => `${r.question}: ${r.answer}`).join("\n");
}

module.exports = {
  isOnboardingComplete,
  saveOnboardingAnswers,
  getUserOnboardingContext
};
