const express = require('express')
const router = express.Router()
// IMPORT mongoose
const mongoose = require('../db/connection')

// IMPORT THE MODELs ONMYOJI AND SHIKIGAMI
const Onmyoji = require('../models/onmyojimd')
const Shikigami = require('../models/shikigamimd')

// CONNECT TO THE DB
const db = mongoose.connection

// ==========  DISPLAYS ALL ONMYOJI =========
router.get('/', (req, res) => {
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

// ==========  CREATE 1 ONMYOJI =========
router.post("/", async (req, res) => {
    console.log("Creating onmyoji: ", req.body)
    res.json(
        await Onmyoji.create(req.body)
    );

});

// ==========  UPDATE ONMYOJI BY ADDING 1 SHIKI =========
router.put("/addShiki/:id", async (req, res) => {
    /*
     Meed to grab the data from body and use it to create a new shiki
     
     The Onmyoji Schema references Shikigami collection so have to 
     push the new hikigami into the 'shikigamis' key.

     Or you can add by sending in the Shiki's ID if it exist.
    */
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

// ==========  UPDATE ONMYOJI INFO - NAME, LEVEL, CLAN =========
router.put("/:id", async (req, res) => {
    res.json(await Onmyoji.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

// ==========  DELETE 1 ONMYOJI BY ID =========
router.delete("/:id", async (req, res) => {
    res.json(await Onmyoji.findByIdAndRemove(req.params.id));
  });


module.exports = router
