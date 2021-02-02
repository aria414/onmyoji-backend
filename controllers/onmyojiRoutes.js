const express = require('express')
const router = express.Router()
// IMPORT mongoose
const mongoose = require('../db/connection')

// IMPORT THE MODELs COOKBOOK AND AUTHOR
const Onmyoji = require('../models/onmyojimd')

// CONNECT TO THE DB
const db = mongoose.connection

// ==========  DISPLAYS ALL ONMYOJI =========
router.get('/', (req, res) => {
    //....Use the model/collection we imported and display its documents
    Onmyoji.find({}).populate("shikigamis").then(allOnmyojis => {
        res.json({
            status: 200,
            onmyojis: allOnmyojis
        })
    }).catch(err => res.json({
        status: 400,
        err: err
    }))
})

// Write the route to create an Onmyoji
router.post("/", async (req, res) => {
    console.log("Creating onmyoji: ", req.body)
    res.json(
        await Onmyoji.create(req.body)
    );

});

//update route
router.put("/:id", async (req, res) => {
    const newData = req.body

    console.log("in put route... ", newData)
    console.log("in put ID... ", req.params.id)

    const onmyoji = await Onmyoji.findByIdAndUpdate(
        req.params.id,
        { $push: {shikigamis: newData}, new: true}
    )
    res.json({status: 200, data: onmyoji})

  });

module.exports = router
