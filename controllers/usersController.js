const { body } = require("express-validator")
const db = require("../db/queries")

const passwordMinLength = 8

const usernameExistsError = "Username already exists"
const emptyNameError = "must not be empty"
const passwordMinLengthError = `Password must have at least ${passwordMinLength} characters`
const passwordContainsError = 
  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
const equalPasswordsError = "Passwords must be equal"

const validateUser = [
  // ----- USERNAME -----
  body("username").trim().notEmpty().custom(async value => {
    const existingUser = await db.getUserFromUsername(value)
    if (existingUser) {
      throw new Error(usernameExistsError);
    }

    return true
  }),

  // ----- FIRST NAME AND LAST NAME -----
  body("first_name").trim().notEmpty().withMessage(`First Name ${emptyNameError}`),

  body("last_name").trim().notEmpty().withMessage(`Last Name ${emptyNameError}`),

  // ----- PASSWORDS -----
  body("password").trim().notEmpty()
    .isLength({ min: passwordMinLength }).withMessage(passwordMinLengthError)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/).withMessage(passwordContainsError),

  body("confirm-password").custom((value, {req}) => {
    if (value !== req.body.password) {
      throw new Error(equalPasswordsError)
    }

    return true
  }),
]

module.exports = {
  validateUser
}