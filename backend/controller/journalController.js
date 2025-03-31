const journals = require('../models/journals')
const mongoose = require('mongoose')

// get all journals
const getAllJournals = async(req, res) => {
    const allJournals = await journals.find({}).sort({createdAt: -1});

    res.status(200).json(allJournals);
}

// get one journal
const getOneJournal = async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({mssg: "No such work"})
    }

    const journal = await journals.findById(id)

    if (!journal) {
        return res.status(404).json({mssg: "No such journal"})
    }

    res.status(200).json(journal)
}

// create new journal
const createJournal = async (req, res) => {
    const { title, entry, rating, sentence } = req.body;

    try {
        // Create new journal entry
        const journalEntry = await journals.create({
            title,
            entry,     
            rating,
            sentence 
        });

        // Send a successful response
        res.status(200).json(journalEntry);
    } catch (error) {
        // Send an error response if something goes wrong
        res.status(400).json({ error: error.message });
    }
};

// delete a entry
const deleteJournal = async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({mssg: "No such work"})
    }

    const journal = await journals.findOneAndDelete({_id: id})

    if (!journal) {
        return res.status(404).json({mssg: "No such journal"})
    }

    res.status(200).json(journal)
}

// update journal
const updateJournal = async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({mssg: "No such work"})
    }

    const journal = await journals.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!journal) {
        return res.status(404).json({mssg: "No such journal"})
    }

    res.status(200).json(journal)
}


module.exports = {
    getAllJournals,
    getOneJournal,
    createJournal,
    deleteJournal,
    updateJournal
}