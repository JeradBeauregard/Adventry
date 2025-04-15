const JournalService = require("../services/JournalSessionService");


const express = require("express");
const router = express.Router();

// start new journal
// Creates journal entry for user, adds first message to conversations table
router.post("/StartJournal", async (request,response)=>{

    const {user_id, title, first_message } = request.body;
    const result = await JournalService.startJournal(user_id, title, first_message);
    response.json(result);  
    


});

// add message 
// start journal and add message automatically call the system response and add its the db
router.post("/AddMessage", async (request,response)=>{

    const { journal_id, user_message } = request.body;
    const result = await  JournalService.addMessage(journal_id, user_message);
    response.json(result);


});


// start new journal

router.get("/GetJournal/:id", async (req, res) => {
    const journal_id = req.params.id;
  
    try {
      const result = await JournalService.getJournal(journal_id);
      res.json(result);
    } catch (err) {
      console.error("Failed to load journal:", err.message);
      res.status(404).json({ error: "Journal not found" }); // ✅ graceful fail
    }
  });
  

// journal user response

// journal system response (ai)

// get completed journal

module.exports = router; // Export the router