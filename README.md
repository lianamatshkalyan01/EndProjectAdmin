# E-commerce for Pharmacy - frontend/Admin

## Description

This project was specifically designed to facilitate the establishment of an E-commerce platform catering to a pharmacy's needs. It encompasses a comprehensive frontend/Admin interface equipped with a preconfigured boilerplate, which seamlessly handles various fundamental frontend tasks. These tasks encompass streamlined authentication processes and effortless management of the crucial CRUD operations.

## Features

* User registration and login
* Authentication via JWT
* Email confirmation
* CRUD operations for categories, undercategories, products

## Technologies/libraries used

* React
* React-router-dom
* MUI

### Installing

```
git clone https://github.com/lianamatshkalyan01/EndProjectAdmin.git
npm install
```

## Getting Started

* Start the application
```
npm start
```
* Navigate to the registration page and fill in the required information, including your first name, last name, email, and password.
* Upon successful registration, you will receive a verification email.
* The verification email will contain a link in the following format: http://localhost:5000/user/verify/token.
* Clicking on the link will confirm your username by changing the "confirmed" field to true and display a confirmation message in the   response.
* Proceed to the login page and enter the same email and password used during registration.
* If the login details are correct, you will be redirected to the admin interface.
* Once logged in, you can proceed with the CRUD operations to create, update, and delete categories, undercategories and products as needed

