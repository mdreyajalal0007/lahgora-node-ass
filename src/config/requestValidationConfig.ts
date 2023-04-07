import { body, CustomValidator, param, query } from "express-validator";

import { UserRole, UserSchema } from "../models/user.model";

// const userExists: CustomValidator = (value) => {
//   return UserSchema.find({ emailId: value }).then((user) => {
//     if (user && user.length) {
//       return Promise.reject("Email already registered.");
//     }
//   });
// };
const userNotExists: CustomValidator = (value) => {
  return UserSchema.find({ username: value }).then((user) => {
    if (user && user.length === 0) {
      return Promise.reject("User is not registered.");
    } else if (user[0].isDelete) {
      return Promise.reject("User is deactivated.");
    }
  });
};
export const requestValidationConfig = {
  register: [
    body("name").isLength({ min: 3, max: 25 }).isString().exists(),
    body("emailId").isEmail().exists(),
    body("mobileNumber").isLength({ min: 10, max: 10 }).isNumeric().exists(),
    body("country").isLength({ min: 3, max: 25 }).isString().exists(),
    body("storeName").isLength({ min: 3, max: 25 }).isString().exists(),
    body("password").isLength({ min: 3, max: 25 }).isString().exists(),
    body("userRole")
      .isLength({ min: 3, max: 25 })
      .isString()
      .exists()
      .isIn([UserRole.CUSTOMER, UserRole.OWNER]),
  ],
  login: [
    body("emailId").isEmail().exists().custom(userNotExists),
    body("password").isLength({ min: 6, max: 15 }).exists(),
  ],
};
