// REQUIRED

const express = require("express"); // imports express modules
const path = require("path"); // imports node.js pathing modules
//set up Express object and port
const app = express(); // creates express application, allows us to use http requests within app
const port = process.env.PORT || "8888"; // sets up default port for localhost, if a service uses its own itll use that instead

app.use(express.static(path.join(__dirname, "public"))); // to access public folder
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); // Parses JSON requests
// routing requirements

// cookies parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());


//set up server listening
app.listen(port, () => { // listens for server 
console.log(`Listening on http://localhost:${port}`); // when server runs callback function console.log executes
});

// ROUTING

const userJournalController = require("./routes/userJournalRoute");
app.use("/auth", userJournalController);

const authPageController = require("./routes/authRoute");
app.use("/", authPageController);


const journalSession = require("./routes/JournalSessionApi");

app.use("/JournalApi", journalSession);

const authApi = require("./routes/authApiRoute");

app.use("/authApi",authApi );

//test message
app.get("/", (req, res) => {  // app.get is a get request to app which represents our express application
    res.render("layout");
    });

const userCMS = require("./routes/UserRoute");
app.use("/userCMS", userCMS);

const journalCMS = require("./routes/JournalRoute");
app.use("/journalCMS", journalCMS);

const petCMS = require("./routes/PetRoute");
app.use("/petCMS", petCMS);

const achievementCMS = require("./routes/AchievementsRoute");
app.use("/achievementsCMS", achievementCMS);

//PUG

app.set("views", path.join(__dirname, "views")); //Specifies the views folder where Pug template files are stored.
                                                  //Express will look in this folder when rendering templates.
app.set("view engine", "pug"); // Sets Pug as the template engine.
                                //This allows Express to automatically convert .pug files into HTML when using res.render().

//__dirname: This is a built-in Node.js variable that gives the absolute path of the current directory (where your script is running).