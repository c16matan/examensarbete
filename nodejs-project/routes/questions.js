const express = require('express');
const router = express.Router();
const db = require('../db.js');
const truncate = require('truncate-html');

router.get('/', function (req, res, next) {
    db.getRecentQuestions(30).then((questions) => {
        // Truncate the body to 50 words
        questions.forEach(question => {
            question.body = truncate(question.body, 50, { byWords: true })
        });
        res.render('index', {
            questions: questions
        });
    }).catch((error) => {
        console.log(error);
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
