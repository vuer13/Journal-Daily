const express = require('express')
const { groqSummary } = require('../controller/groqController')

const router = express.Router();

router.post('/generate-summary', groqSummary)

module.exports = router