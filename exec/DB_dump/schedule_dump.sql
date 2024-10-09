-- V1

DROP TABLE IF EXISTS schedule_category;
DROP TABLE IF EXISTS schedule;
DROP TABLE IF EXISTS ended_schedule;
DROP TABLE IF EXISTS pet_to_ended_schedule;
DROP TABLE IF EXISTS pet_to_schedule;


CREATE TABLE schedule_category (
    schedule_category_id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    PRIMARY KEY (schedule_category_id)
);

CREATE TABLE schedule (
    schedule_id BIGINT NOT NULL AUTO_INCREMENT,
    schedule_category_id BIGINT NOT NULL,
    description VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    interval_type VARCHAR(255) NOT NULL,
    interval_day INT NOT NULL,
    next_schedule_date DATE NOT NULL,
    status VARCHAR(255) NOT NULL DEFAULT '활성',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (schedule_id),
    CONSTRAINT fk_schedule_category_id FOREIGN KEY (schedule_category_id) REFERENCES schedule_category(schedule_category_id)
);

CREATE TABLE ended_schedule (
    ended_schedule_id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    schedule_category_title VARCHAR(255) NOT NULL,
    schedule_description VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL,
    PRIMARY KEY (ended_schedule_id)
);

CREATE TABLE pet_to_ended_schedule (
    pet_to_ended_schedule_id BIGINT NOT NULL AUTO_INCREMENT,
    pet_id BIGINT NOT NULL,
    ended_schedule_id BIGINT NOT NULL,
    PRIMARY KEY (pet_to_ended_schedule_id),
    CONSTRAINT fk_pet_to_ended_schedule_ended_schedule_id FOREIGN KEY (ended_schedule_id) REFERENCES ended_schedule(ended_schedule_id)
);

CREATE TABLE pet_to_schedule (
    pet_schedule_id BIGINT NOT NULL AUTO_INCREMENT,
    pet_id BIGINT NOT NULL,
    schedule_id BIGINT NOT NULL,
    PRIMARY KEY (pet_schedule_id),
    CONSTRAINT fk_pet_to_schedule_schedule_id FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id)
);

-- V2
ALTER TABLE schedule_category ADD COLUMN icon VARCHAR(255) AFTER title;
ALTER TABLE ended_schedule add column schedule_category_icon varchar(255) after schedule_category_title;

update ended_schedule set schedule_category_icon = case schedule_category_title
    when "목욕" then "play"
    when "사료 구입" then "shopping"
    when "산책" then "play"
    when "사냥 놀이" then "play"
end;

UPDATE schedule_category SET icon = 'play' WHERE (schedule_category_id = 1);
UPDATE schedule_category SET icon = 'play' WHERE (schedule_category_id = 2);
UPDATE schedule_category SET icon = 'shopping' WHERE (schedule_category_id = 3);
UPDATE schedule_category SET icon = 'play' WHERE (schedule_category_id = 4);
