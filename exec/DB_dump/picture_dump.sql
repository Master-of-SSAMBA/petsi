DROP TABLE IF EXISTS picture;

CREATE TABLE picture (
    picture_id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    img VARCHAR(255) NOT NULL,
    content VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (picture_id)
);