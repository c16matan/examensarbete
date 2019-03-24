DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
	id BIGINT,
	post_type SMALLINT,
	parent_id BIGINT,
	accepted_answer BIGINT,
	score SMALLINT,
	view_count INTEGER,
	answer_count SMALLINT,
	title VARCHAR(150),
	body TEXT,
	comment_count SMALLINT,
	creation_date TIMESTAMP,
	last_edit_date TIMESTAMP,
	last_activity_date TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE comments (
	id BIGINT,
	post_id BIGINT,
	text TEXT,
	creation_date TIMESTAMP,
	PRIMARY KEY (id),
	CONSTRAINT comments_posts_id_fk FOREIGN KEY (post_id) REFERENCES posts (id)
);
