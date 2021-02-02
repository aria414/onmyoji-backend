const express = require('express')
const router = express.Router()
// IMPORT mongoose
const mongoose = require('../db/connection')

// IMPORT THE MODELs COOKBOOK AND AUTHOR
const Shiki = require('../models/shikigamimd')

// CONNECT TO THE DB
const db = mongoose.connection


router.get('/', (req, res) => {
    //....Use the model/collection we imported and display its documents
    Shiki.find({}).then(allShikis => {
        res.json(allShikis)
    }).catch(err => res.json({
        status: 400,
        err: err
    }))
})

module.exports = router
