const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}
const reqNum = {
    type: Number,
    required: true
}
const welcomeSchema = mongoose.Schema({
    _id: reqString,
    messageCount: reqNum
})

module.exports = mongoose.model('message-count', welcomeSchema)