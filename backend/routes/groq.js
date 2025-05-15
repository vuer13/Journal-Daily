const express = require('express')
const { groqSummary, groqTitle } = require('../controller/groqController')

const router = express.Router();

router.post('/generate-summary', groqSummary)
router.post('/generate-title', groqTitle)

module.exports = router