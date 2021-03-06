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
    db.searchQuestions(searchWords).then((result) => {
        res.render('search', {
            search: searchWords,
            amount_of_results: result.questions.length,
            total_amount_of_results: result.total_amount_of_results,
            questions: result.questions
        }, function (err, html) {
            res.json({
                title: 'Questions containing \'' + searchWords + '\'',
                body: html
            });
        })
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
