// REQUIRED

require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || "8888";

// ✅ 1. CORS (MUST BE FIRST for credential-based requests)
app.use(cors({
  origin: "http://localhost:5173", // React (Vite) dev server
  credentials: true // Allow cookies and authentication headers
}));

// ✅ 2. Core middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// ✅ 3. Routes

const userJournalController = require("./routes/userJournalRoute");
app.use("/journal", userJournalController);

const authPageController = require("./routes/authRoute");
app.use("/", authPageController);

const journalSession = require("./routes/JournalSessionApi");
app.use("/JournalApi", journalSession);

const authApi = require("./routes/authApiRoute");
app.use("/authApi", authApi);

const userCMS = require("./routes/UserRoute");
app.use("/userCMS", userCMS);

const journalCMS = require("./routes/JournalRoute");
app.use("/journalCMS", journalCMS);

const petCMS = require("./routes/PetRoute");
app.use("/petCMS", petCMS);

const achievementCMS = require("./routes/AchievementsRoute");
app.use("/achievementsCMS", achievementCMS);

// ✅ 4. PUG setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// ✅ 5. React static build (production only)
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "../client/build");
  app.use(express.static(clientBuildPath));

  // All unmatched routes go to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

// ✅ 6. Server start
app.listen(port, () => {
  console.log(`🔥 Server running at http://localhost:${port}`);
});
