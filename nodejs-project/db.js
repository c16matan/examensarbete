const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'examensarbete',
    user: 'admin',
    password: 'admin',
});

/**
 * Gets the most recent questions.
 *
 * @param {Number} amount The sql limit
 */
const getRecentQuestions = (amount) => {
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
            ORDER BY questions_post.id DESC LIMIT $1`,
            [amount],
            (error, result) => {
                if (error) {
                    logger.error('Error fetching data: ' + error);
                } else {
                    result.rows.forEach(row => {
                        row.creation_date = new Date(row.creation_date).toLocaleString('sv-SE');
                        row.last_edit_date = new Date(row.last_edit_date).toLocaleString('sv-SE');
                    });
                    resolve(result.rows)
                }
            });
    });
}

const searchQuestions = (search) => {
}

const getAnswersForQuestion = (id) => {
}

const getCommentsOnPosts = (postIds) => {
}

module.exports = {
    getRecentQuestions,
    searchQuestions,
    getAnswersForQuestion,
    getCommentsOnPosts
}

