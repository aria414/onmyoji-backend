const express = require('express')
const router = express.Router()
// IMPORT mongoose
const mongoose = require('../db/connection')

// IMPORT THE MODELs COOKBOOK AND AUTHOR
// const Shiki = require('../models/Shiki')
// const Onmyoji = require('../models/Onmyoji')

// CONNECT TO THE DB
const db = mongoose.connection

router.get('/', (req, res) => {
    //....Use the model/collection we imported and display its documents
    // Onmyoji.find({}).then(allOnmyojis => {
    //     res.json({
    //         status: 200,
    //         onmyojis: allOnmyojis
    //     })
    // }).catch(err => res.json({
    //     status: 400,
    //     err: err
    // }))
    res.json({
        status: 200,
        msg: "In Onmyoji Route"
    })
})

module.exports = router
