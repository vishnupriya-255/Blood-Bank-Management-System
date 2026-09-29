CREATE DATABASE blood_bank;
USE blood_bank;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
select * from users;

CREATE TABLE donors (
    donor_id INT  PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    gender VARCHAR(10),
    blood_group VARCHAR(5) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100),
    address VARCHAR(200),
    last_donation_date DATE
);
select * from donors;
CREATE TABLE blood_stock (
    stock_id INT  PRIMARY KEY,
    blood_group VARCHAR(5) NOT NULL,
    units INT NOT NULL,
    collection_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL
);
select*from blood_stock;
select * from hospitals;
CREATE TABLE hospitals (
    hospital_id INT  PRIMARY KEY,
    hospital_name VARCHAR(150) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100),
    address VARCHAR(200)
);
CREATE TABLE blood_requests (
    request_id INT  PRIMARY KEY,
    hospital_id INT NOT NULL,
    blood_group VARCHAR(5) NOT NULL,
    units_required INT NOT NULL,
    request_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,

    FOREIGN KEY (hospital_id)
    REFERENCES hospitals(hospital_id)
);
select * from blood_requests;
CREATE TABLE camps (
    camp_id INT  PRIMARY KEY,
    camp_name VARCHAR(150) NOT NULL,
    location VARCHAR(200),
    camp_date DATE NOT NULL,
    organizer VARCHAR(100),
    collected_units INT DEFAULT 0
);
select * from camps;
CREATE TABLE cross_match (
    cross_match_id INT  PRIMARY KEY,
    request_id INT NOT NULL,
    donor_blood_group VARCHAR(5) NOT NULL,
    patient_blood_group VARCHAR(5) NOT NULL,
    result VARCHAR(30) NOT NULL,
    test_date DATE NOT NULL,

    FOREIGN KEY (request_id)
    REFERENCES blood_requests(request_id)
);
select * from cross_match;