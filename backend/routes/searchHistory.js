const router = require('express').Router();
let SearchHistory = require('../models/searchHistory.model');

router.route('/').get((req,res) => {
  SearchHistory.find()
    .then(searchHistory => res.json(searchHistory))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
  let createdSearchHistory = new SearchHistory({
    userId: req.body.userId,
    searchString: req.body.searchString,
    searchQuery: req.body.searchQuery
  })
  
  createdSearchHistory.save()
    .then(() => res.json('SearchHistory saved!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;