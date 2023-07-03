-- Tworzenie tabeli currency
CREATE TABLE currency (
  currency_id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  code VARCHAR(3)
);

-- Tworzenie tabeli category
CREATE TABLE category (
  category_id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

-- Tworzenie tabeli "person"
CREATE TABLE person (
  person_id SERIAL PRIMARY KEY,
  nickname VARCHAR(15),
  email VARCHAR(100),
  password VARCHAR(30)
);

-- Tworzenie tabeli "transaction"
CREATE TABLE "transaction" (
  transaction_id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  amount NUMERIC(10,2),
  currency_id INT REFERENCES currency(currency_id),
  date DATE,
  category_id INT REFERENCES category(category_id),
  description TEXT,
  person_id INT REFERENCES person(person_id)
);

-- Wprowadzanie przykładowych walut
INSERT INTO currency (name, code) VALUES ('US Dollar', 'USD');
INSERT INTO currency (name, code) VALUES ('Euro', 'EUR');
INSERT INTO currency (name, code) VALUES ('British Pound', 'GBP');
INSERT INTO currency (name, code) VALUES ('Japanese Yen', 'JPY');

-- Wprowadzanie przykładowych kategorii
INSERT INTO category (name) VALUES ('Groceries');
INSERT INTO category (name) VALUES ('Transportation');
INSERT INTO category (name) VALUES ('Entertainment');
INSERT INTO category (name) VALUES ('Utilities');

-- Wprowadzanie przykładowych osób
INSERT INTO person (nickname, email, password) VALUES ('John', 'john@example.com', 'password1');
INSERT INTO person (nickname, email, password) VALUES ('Sarah', 'sarah@example.com', 'password2');
INSERT INTO person (nickname, email, password) VALUES ('Michael', 'michael@example.com', 'password3');

-- Wprowadzanie przykładowych transakcji dla Johna (person_id = 1)
INSERT INTO "transaction" (title, amount, currency_id, date, category_id, description, person_id)
VALUES ('Grocery shopping', 50.25, 1, '2023-06-28', 1, 'Bought groceries for the week', 1);
INSERT INTO "transaction" (title, amount, currency_id, date, category_id, description, person_id)
VALUES ('Movie tickets', 20.50, 1, '2023-06-30', 3, 'Watched a new release at the cinema', 1);
INSERT INTO "transaction" (title, amount, currency_id, date, category_id, description, person_id)
VALUES ('Coffee', 3.50, 1, '2023-07-01', 4, 'Bought a cup of coffee', 1);
INSERT INTO "transaction" (title, amount, currency_id, date, category_id, description, person_id)
VALUES ('Books', 60.00, 1, '2023-07-02', 4, 'Purchased new books', 1);

-- Wprowadzanie przykładowych transakcji dla Sarah (person_id = 2)
INSERT INTO "transaction" (title, amount, currency_id, date, category_id, description, person_id)
VALUES ('Gasoline', 35.75, 1, '2023-06-29', 2, 'Filled up the car with gas', 2);
INSERT INTO "transaction" (title, amount, currency_id, date, category_id, description, person_id)
VALUES ('Dinner with friends', 80.00, 1, '2023-06-30', 3, 'Had a delicious dinner at a restaurant', 2);
INSERT INTO "transaction" (title, amount, currency_id, date, category_id, description, person_id)
VALUES ('Movie tickets', 15.50, 1, '2023-06-30', 3, 'Watched a movie with friends', 2);
INSERT INTO "transaction" (title, amount, currency_id, date, category_id, description, person_id)
VALUES ('Groceries', 40.00, 1, '2023-07-01', 1, 'Purchased groceries for the week', 2);
INSERT INTO "transaction" (title, amount, currency_id, date, category_id, description, person_id)
VALUES ('Lunch', 12.75, 1, '2023-07-01', 3, 'Had lunch at a nearby cafe', 2);
INSERT INTO "transaction" (title, amount, currency_id, date, category_id, description, person_id)
VALUES ('Clothing', 75.00, 1, '2023-07-02', 4, 'Bought new clothes', 2);
INSERT INTO "transaction" (title, amount, currency_id, date, category_id, description, person_id)
VALUES ('Movie tickets', 10.50, 1, '2023-07-02', 3, 'Watched a movie at the cinema', 2);
INSERT INTO "transaction" (title, amount, currency_id, date, category_id, description, person_id)
VALUES ('Groceries', 30.00, 1, '2023-07-02', 1, 'Purchased groceries for the weekend', 2);
INSERT INTO "transaction" (title, amount, currency_id, date, category_id, description, person_id)
VALUES ('Coffee', 4.50, 1, '2023-07-02', 4, 'Bought a cup of coffee', 2);

