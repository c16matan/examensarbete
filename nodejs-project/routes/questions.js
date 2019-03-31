var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express',
        questions: []
    });
});

router.get('/search/:search', function (req, res, next) {
    res.render('search', {
        search: req.params.search.replace('+', ' '),
        amount_of_results: 0,
        questions: [{
            title: "test"
        }]
    });
});

module.exports = router;
