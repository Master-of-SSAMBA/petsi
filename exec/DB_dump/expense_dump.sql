DROP TABLE IF EXISTS medical_expense;
DROP TABLE IF EXISTS purchase;

CREATE TABLE medical_expense (
    medical_expense_id BIGINT NOT NULL AUTO_INCREMENT,
    pet_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    disease_name VARCHAR(255) NOT NULL,
    cost INT NOT NULL,
    hospital VARCHAR(255) NOT NULL,
    visited_at DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    memo VARCHAR(255),
    PRIMARY KEY (medical_expense_id)
);

CREATE TABLE purchase (
    purchase_id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    detail VARCHAR(255),
    img VARCHAR(255),
    purchased_at DATE NOT NULL,
    quantity INT NOT NULL,
    cost INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (purchase_id)
);