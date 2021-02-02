const { model } = require('../db/connection')
const mongoose = require('../db/connection')
//IMPORT THE SCHEMA CLASS. Classes are uppercase.
const Schema = mongoose.Schema

const shikiSchema = new Schema ({
    name: {type: String, required: true},
    grade: {type: Number, required: true},
    rarity: {type: String, required: true}
})


//export model named "Author"
const Shikigami = mongoose.model('Shikigami', shikiSchema)
module.exports = Shikigami