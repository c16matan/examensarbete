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
    let searchWords = req.params.search;
    db.searchQuestions(searchWords).then((questions) => {
        res.render('search', {
            search: searchWords.replace('+', ' '),
            amount_of_results: questions.length,
            questions: questions
        });
    }).catch((error) => {
        console.log(error);
    });
});

router.get('/question/:id', function (req, res, next) {
    let questionId = req.params.id;
    // Get all answers including the question
    db.getAnswersForQuestion(questionId).then((posts) => {
        let ids = [];
        posts.forEach(post => {
            ids.push(post.id)
        });
        // Get all comments on the posts above
        db.getCommentsOnPosts(ids).then((comments) => {
            res.render('question', {
                posts: posts,
                amount_of_results: posts.length - 1,
                comments: comments
            });
        }).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);
    });
});

module.exports = router;
