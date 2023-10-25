# Backend technical test

## Guidelines

You should spend no more than 2 hours undertaking this test, making as much progress as you feel you can within the time allowed. You are not required to produce a final product.

Your code will be reviewed on a system with the following installed:

- Node v18

If you have any specific comments or instructions regarding your code, please also include them in the project readme file.

## Test #1 - Refactoring

Given the following code, perform a refactoring to create easily readable code flow following functional programming principles:

- Design your software using pure, isolated functions.
- Avoid mutability and side effects.
- Make your code referentially transparent.

If the result of the function is lower than 10, it must return a null value.

Note: The writing of logical expressions (if, else, while, for, etc...) is not allowed.

## Test #1 Solution 

Run command: ``node refactoring/run``

We define the fn1, fn2, fn3, and fn4 functions as you provided.

We create a generic applyFunctions function that takes a value and a list of functions. It applies the functions in the order they are provided using reduce, and then checks if the result is less than 10. If the result is less than 10, it returns null; otherwise, it returns the result.

We apply the applyFunctions function to the initial value of 2 and the functions you provided, storing the result in the result variable.

## Test #2 - Creating an API

For this exercise we will create an API, with a single resource, in which the data input will
be validated, and the logic described below will be applied.
The API has to be created with the "Express.js" library, and can be supported by any
library that helps to facilitate its creation.
The inclusion of a "Docker" file to be able to run the test inside a container will be highly
appreciated.

## Test #2 - Solution

Run api :
- ``npx ts-node api/src/index.ts``

Test api: 

First navigate to api folder

- ``cd api``

Then run command

- ``npx mocha --require ts-node/register api/test/**/*.ts``

### Summary -- This endpoint must

Description - Check schema for validation
- Return response OK, BAD_REQUEST, NOT_FOUND
Path POST
Route: <API_PATH>/user/:username
Payload: { “action”: xxx, “amount”: xxx }

### Field Type Validation

:username Text -Required

-Must be an Email
-The Only valid username is “JohnDoe@example.com”

action Text -Required

-Only valid “Remove” or “Add”

amount Number -Required

-Number
-Bigger than 0
-Must be lower than 200 if “action” is “remove”
-Action “remove” will discount 10% from the initial amount

### (200) RESPONSE OK Use same schema response

{
 “response”: {
 “username”: “<USER_POSTED>”,
 “action”: “<ACTION_POSTED”,
 “amount”: <AMOUNT_POSTED>
 }
}

### (400) BAD_REQUEST Use same schema response

{
 “message”: “Validation error”,
 “fields: [
 “<FIELD_ERROR>”: “<FIELD_ERROR_TYPE” // isRequired, isEmail, etc… Described above
 ],
 “status”: 400,
}
###  (404) NOT FOUND Use same schema response

{
 “message”: “Resource not found”,
 “status”: 404
}

# API Documentation

This documentation provides information about the API created using Express.js. The API allows you to interact with a user resource by performing actions like adding or removing a specified amount. It also includes validation for the input parameters.

## API Endpoints

### Add or Remove User Funds

**Route**: `POST /user/:username`

This endpoint is used to add or remove funds for a user with the provided `username`.

#### Request

- **HTTP Method**: POST
- **URL Parameters**:
  - `:username` (string) - The username of the user to perform the action on. It should be a valid email address
- **Request Body** (JSON):  
  - `action` (string, required) - The action to perform. Should be one of: 'Add', 'Remove'.
  - `amount` (number, required) - The amount to be added or removed. Must be a number between 1 and 200.

#### Example Request

```json
POST /user/JohnDoe@example.com

{
  "username": "JohnDoe@example.com",
  "action": "Add",
  "amount": 50
}
