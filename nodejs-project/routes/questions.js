const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.get('/', function (req, res, next) {
    db.getRecentQuestions(30).then((questions) => {
        res.render('index', {
            questions: questions
        });
    }).catch((error) => {
        console.log(error);
    });
});

router.get('/search/:search', function (req, res, next) {
    let search_words = req.params.search;
    db.searchQuestions(search_words).then((questions) => {
        res.render('search', {
            search: search_words.replace('+', ' '),
            amount_of_results: questions.length,
            questions: questions
        });
    }).catch((error) => {
        console.log(error);
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
