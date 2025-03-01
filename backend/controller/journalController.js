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

    res.status(200).json(workout)
}

// create new journal
const createJournal = async(req, res) => {
    const { title, enter, rating, sum } = req.body

    try {
        const entry = await journals.create({ title, enter, rating, sum });
        res.status(200).json(entry);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

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

    res.status(200).json(workout)
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

    res.status(200).json(workout)
}


module.export = {
    getAllJournals,
    getOneJournal,
    createJournal,
    deleteJournal,
    updateJournal
}