const express = require('express')
const router = express.Router()
// IMPORT mongoose
const mongoose = require('../db/connection')

// IMPORT THE MODELs COOKBOOK AND AUTHOR
const Shiki = require('../models/shikigamimd')

// CONNECT TO THE DB
const db = mongoose.connection


// ==========  DISPLAYS ALL ONMYOJI =========
router.get('/', (req, res) => {
    Shiki.find({}).then(allShikis => {
        res.json(allShikis)
    }).catch(err => res.json({
        status: 400,
        err: err
    }))
})

// ==========  CREATE 1 SHIKIGAMI =========
router.post("/", async (req, res) => {
    res.json(
        await Shikigami.create(req.body)
    );

});

// ==========  UPDATE 1 SHIKIGAMI BY ID =========
router.put("/:id", async (req, res) => {
    res.json(await Shikigami.findByIdAndUpdate(req.params.id, req.body, { new: true }));
  });

  // ==========  DELETE 1 SHIKIGAMI BY ID =========
router.delete("/:id", async (req, res) => {
    res.json(await Shikigami.findByIdAndRemove(req.params.id));
  });
  
module.exports = router
