import { Router, Response } from "express";
import { promises as fsPromises } from "fs";
import path from "path";
import { UserRequest, User } from "./types";

const router = Router();
const dataFile = path.resolve(__dirname, "../data/users.json");

/**
 * POST /write/adduser - Adds a new user.
 * @param {UserRequest} req - The request object, containing the new user data in the body.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is added.
 */
router.post("/adduser", async (req: UserRequest, res: Response) => {
  try {
    const newUser = req.body as User;
    if (!req.users) {
      return res.status(404).json({ error: "users not found" });
    }
    req.users.push(newUser);
    await fsPromises.writeFile(dataFile, JSON.stringify(req.users));
    res.send("done");
  } catch (err) {
    res.status(500).send("Error saving user");
  }
});

export default router;