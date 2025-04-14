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

router.get("/GetJournal", async (request, response)=>{

    const {journal_id} = request.body;
    const result = await JournalService.getJournal(journal_id);
    response.json(result);

});

// journal user response

// journal system response (ai)

// get completed journal

module.exports = router; // Export the router