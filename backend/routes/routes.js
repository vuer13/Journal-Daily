const express = require('express');
const {
    getAllJournals,
    getOneJournal,
    createJournal,
    deleteJournal,
    updateJournal
} = require('../controller/journalController')

const router = express.Router();

// get all the journals
router.get('/', getAllJournals);

// get one journal
router.get('/:id', getOneJournal);

// post new journal
router.post('/create', createJournal);

// delete entry
router.delete('/:id', deleteJournal);

// update entry
router.patch('/:id', updateJournal);

module.exports = router;