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

router.get('/question/:id', function (req, res, next) {
    res.render('question', {
        posts: [{
            id: req.params.id,
            creation_date: "2019",
            last_edit_date: '2020',
            answer_count: "10",
            score: 5,
            body: '<p>test</p> ',
            title: 'NeoVim'
        }],
        comments: [{
            post_id: req.params.id,
            text: '<p>Test comment</p>',
            creation_date: '2019'
        }]
    });
});

module.exports = router;
