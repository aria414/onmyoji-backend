const express = require('express')
const router = express.Router()
// IMPORT mongoose
const mongoose = require('../db/connection')

// IMPORT THE MODELs COOKBOOK AND AUTHOR
const Onmyoji = require('../models/onmyojimd')
const Shikigami = require('../models/shikigamimd')

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

//Update route ... To update the Onmyoji with new Shikigami
router.put("/addShiki/:id", async (req, res) => {
    const newData = await Shikigami.create(req.body)
     
    const onmyoji = await Onmyoji.findByIdAndUpdate(
        req.params.id,
        { 
            $push: {shikigamis: newData}, 
            new: true
        }
    )
    res.json(onmyoji)

  });

  // Update route ...  route for general Onmyoji info
router.put("/:id", async (req, res) => {
    res.json(await Onmyoji.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

// Delete route ...
router.delete("/:id", async (req, res) => {
    res.json(await Onmyoji.findByIdAndRemove(req.params.id));
  });


module.exports = router
