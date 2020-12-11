const mongoose = require('mongoose')
const User = require('./Schema/User')
const SearchHistory = require('./Schema/SearchHistory')

const pushUser = async (req, res, next) => {
    connectDb('Users')

    let createdUser = new User({
        userId: req.body.userId,
        email: req.body.email,
        displayName: req.body.displayName
    })

    let output = await createdUser.save();

    res.json(output)
}


const fetchUser = async (req, res, next) => {
    connectDb('Users')
    const users = await User.find().exec()
    res.json(users)
}

const pushSearchHistory = async (req, res, next) => {
    connectDb('SearchHistory')

    let createdSearchHistory = new SearchHistory({
        userId: req.body.userId,
        searchString: req.body.searchString,
        searchQuery: req.body.searchQuery
    })

    let output = await createdSearchHistory.save();

    res.json(output)
}


const fetchSearchHistory = async (req, res, next) => {
    connectDb('SearchHistory')
    const searchHistory = await SearchHistory.find().exec()

    res.json(searchHistory)
}


function connectDb(dbName) {
    const url = 'mongodb+srv://admin:admin@spotoncluster.pmfs7.mongodb.net/' + dbName + '?retryWrites=true&w=majority'

    mongoose.connect(
        url,
        { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => {
        console.log("Connection Successful")
    }).catch((error) => {
        console.log('Connection Failed')
    })
}

exports.pushUser = pushUser;
exports.pushSearchHistory = pushSearchHistory
exports.fetchUser = fetchUser
exports.fetchSearchHistory = fetchSearchHistory