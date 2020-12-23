const mongoose = require('mongoose')
const { stringify } = require('querystring')

const searchHistorySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    searchString: { type: Array, required: true },
    searchQuery: { type: String, required: true }
})


module.exports = mongoose.model('SearchHistory', searchHistorySchema);