const { model } = require('../db/connection')
const mongoose = require('../db/connection')
//IMPORT THE SCHEMA CLASS. Classes are uppercase.
const Schema = mongoose.Schema

const onmyojiSchema = new Schema ({
    name: {type: String, required: true},
    clan: {type: String, required: true},
    level: {type: Number, required: true},
    shikigamis: [ {
            ref: 'Shikigami',
            type: mongoose.Schema.Types.ObjectId
    } ] 
})


//export model named "Onmoyji"
const Onmoyji = mongoose.model('Onmoyji', onmyojiSchema)

module.exports = Onmoyji