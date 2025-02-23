import { Router, Response } from "express";
import { UserRequest, User } from "./types";

const router = Router();

/**
 * GET /read/usernames - Returns an array of objects containing the id and username of each user.
 * @name GET /read/usernames
 * @function
 * @memberof module:readUsers
 * @param {UserRequest} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Object[]} An array of objects containing the id and username of each user.
 */
router.get("/usernames", (req: UserRequest, res: Response) => {
  const usernames = req.users?.map((user: User) => ({
    id: user.id,
    username: user.username,
  }));
  res.send(usernames);
});

/**
 * GET /read/username/:name - Returns an array containing the id and email of the user with the specified username.
 * @name GET /read/username/:name
 * @function
 * @memberof module:readUsers
 * @param {UserRequest} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Object[]} An array containing the id and email of the user with the specified username.
 * @throws {Object[]} An empty array if the user is not found.
 */
router.get("/username/:name", (req: UserRequest, res: Response) => {
  const userName = req.params.name;
  const user = req.users?.find((u) => u.username === userName);
  if (user) {
    res.send([{ id: String(user.id), email: user.email }]);
  } else {
    res.send([]);
  }
});

export default router;
