const striptags = require('striptags');
const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'examensarbete',
    user: 'admin',
    password: 'admin',
});

/**
 * Format the date according to the standard of this application
 *
 * @param {Date} date Date as a string
 */
const formatDate = (date) => {
    var withLeadingZero = function (date) {
        return ("0" + date).slice(-2)
    }
    return date.getFullYear() + "-"
        + withLeadingZero(date.getMonth() + 1) + "-"
        + withLeadingZero(date.getDate()) + " "
        + withLeadingZero(date.getHours()) + ":"
        + withLeadingZero(date.getMinutes()) + ":"
        + withLeadingZero(date.getSeconds());
}

/**
 * Format the posts to be previews. This will shorten the
 * body to 50 words and format all dates to follow this
 * applications standard.
 *
 * @param {Array} posts All of the posts to format
 */
const formatPreviewPosts = (posts) => {
    posts.forEach(post => {
        post.body = striptags(post.body)
            .split(/\s+/).slice(0, 50).join(" ");
        post.creation_date = formatDate(post.creation_date);
        if (post.last_edit_date) {
            post.last_edit_date = formatDate(post.last_edit_date);
        }
    });
    return posts;
}

/**
 * Gets the total amount of posts in the database.
 */
const getTotalAmountOfPosts = async () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT
                COUNT(Id) as amount_of_posts
            FROM questions_post`,
            (error, result) => {
                if (error) {
                    logger('Error fetching data: ' + error);
                } else {
                    resolve(result.rows[0].amount_of_posts);
                }
            });
    });
}

/**
 * Gets the most recent questions. Also truncates the body to 50 words.
 *
 * @param {Number} amount The sql limit
 */
const getRecentQuestions = async (amount) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT
                questions_post.id,
                questions_post.post_type,
                questions_post.parent_id,
                questions_post.accepted_answer,
                questions_post.score,
                questions_post.title,
                questions_post.body,
                questions_post.creation_date,
                questions_post.last_edit_date,
                questions_post.search_vector,
                COUNT(T2.id) AS num_of_answers
            FROM questions_post
            LEFT OUTER JOIN questions_post
                T2 ON(questions_post.id = T2.parent_id)
            WHERE questions_post.post_type = 1
            GROUP BY questions_post.id, questions_post.accepted_answer
            ORDER BY questions_post.id DESC
            LIMIT $1`,
            [amount],
            (error, result) => {
                if (error) {
                    console.log('Error fetching data: ' + error);
                } else {
                    let questions = formatPreviewPosts(result.rows);
                    resolve(questions)
                }
            });
    });
}

/**
 * Gets questions based on the search words provided. Also truncates the body to 50 words.
 *
 * @param {String} search The search words separated by pluses.
 */
const searchQuestions = async (search_words) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT
                questions_post.id,
                questions_post.post_type,
                questions_post.parent_id,
                questions_post.accepted_answer,
                questions_post.score,
                questions_post.title,
                questions_post.body,
                questions_post.creation_date,
                questions_post.last_edit_date,
                questions_post.search_vector,
                COUNT(T2.id) AS num_of_answers
            FROM questions_post
            LEFT OUTER JOIN questions_post T2
                ON (questions_post.id = T2.parent_id)
            WHERE (
                questions_post.post_type = 1 AND
                questions_post.search_vector @@ (plainto_tsquery($1)) = true)
            GROUP BY questions_post.id ORDER BY questions_post.id DESC
            LIMIT 50`,
            [search_words],
            (error, result) => {
                if (error) {
                    console.log('Error fetching data: ' + error);
                } else {
                    let questions = formatPreviewPosts(result.rows);
                    resolve(questions)
                }
            });
    });
}

/**
 * Gets all of the answers for the given question
 * id. The question post will be included in the
 * reponse.
 *
 * @param {Number} id Id of the question
 */
const getAnswersForQuestion = async (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT
                questions_post.id,
                questions_post.post_type,
                questions_post.parent_id,
                questions_post.accepted_answer,
                questions_post.score,
                questions_post.title,
                questions_post.body,
                questions_post.creation_date,
                questions_post.last_edit_date,
                questions_post.search_vector
            FROM questions_post
            WHERE(
                questions_post.id = $1 OR
                questions_post.parent_id = $1)
            ORDER BY questions_post.id ASC, questions_post.score ASC`,
            [id],
            (error, result) => {
                if (error) {
                    console.log('Error fetching data: ' + error);
                } else {
                    let answers = result.rows;
                    answers.forEach(answer => {
                        answer.creation_date = formatDate(answer.creation_date);
                        if (answer.last_edit_date) {
                            answer.last_edit_date = formatDate(answer.last_edit_date);
                        }
                    });
                    resolve(answers)
                }
            });
    });
}

/**
 * Get all comments for the given post ids.
 *
 * @param {Array} postIds
 */
const getCommentsOnPosts = async (postIds) => {
    let paramIds = [];
    for (let i = 0; i < postIds.length; i++) {
        paramIds.push('$' + parseInt(i + 1))
    }
    return new Promise((resolve, reject) => {
        pool.query(`SELECT
                questions_comment.id,
                questions_comment.post_id,
                questions_comment.text,
                questions_comment.creation_date
            FROM questions_comment
            WHERE
                questions_comment.post_id IN (` + paramIds.join(',') + `)
            ORDER BY questions_comment.id ASC`,
            postIds,
            (error, result) => {
                if (error) {
                    console.log('Error fetching data: ' + error);
                } else {
                    let comments = result.rows;
                    comments.forEach(comment => {
                        comment.creation_date = formatDate(comment.creation_date);
                    });
                    resolve(comments);
                }
            });
    });
}



module.exports = {
    getTotalAmountOfPosts,
    getRecentQuestions,
    searchQuestions,
    getAnswersForQuestion,
    getCommentsOnPosts
};

