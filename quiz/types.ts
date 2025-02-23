import { Request } from "express";

/**
 * A type that represents a user object
 * @interface
 * @property {number} id - The user's id
 * @property {string} firstName - The user's first name
 * @property {string} lastName - The user's last name
 * @property {string} username - The user's username
 * @property {string} email - The user's email
 */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

/**
 * A type that represents the request received by the server
 * @interface
 * @extends {Request}
 * @property {User[]} users - An array of user objects
 * @property {User} body - The user object in the request body
 */
export interface UserRequest extends Request {
  users?: User[];
}