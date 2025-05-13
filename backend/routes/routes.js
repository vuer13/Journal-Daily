const express = require('express');
const {
    getAllJournals,
    getOneJournal,
    createJournal,
    deleteJournal,
    updateJournal
} = require('../controller/journalController');
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();
router.use(requireAuth)

// Define the routes properly
router.get('/', getAllJournals);  // GET /api/journals
router.get('/:id', getOneJournal);  // GET /api/journals/:id
router.post('/', createJournal);  // POST /api/journals
router.delete('/:id', deleteJournal);  // DELETE /api/journals/:id
router.patch('/:id', updateJournal);  // PATCH /api/journals/:id

module.exports = router;