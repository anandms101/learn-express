import express, { Express, Response, NextFunction } from "express";
import cors from "cors";
import { promises as fsPromises } from "fs";
import path from "path";
import readRouter from "./readUsers";
import writeRouter from "./writeUsers";
import { User, UserRequest } from "./types";

const app: Express = express();
const port = 8000;
const dataFile = path.resolve(__dirname, "../data/users.json");

let users: User[] = [];

/**
 * Reads users from the data file before starting the server.
 * @returns {Promise<void>} - A promise that resolves when the users are read.
 */
async function readUsersFile() {
  try {
    const data = await fsPromises.readFile(dataFile);
    users = JSON.parse(data.toString());
    console.log("File read successfully");
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
}

/**
 * Middleware to attach users data to the request.
 * @param {UserRequest} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
const addUsersToRequest = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  if (users) {
    req.users = users;
    next();
  } else {
    res.status(404).json({ error: "users not found" });
  }
};

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the addUsersToRequest middleware to all endpoints.
app.use(addUsersToRequest);
// Mount modular routers.
app.use("/read", readRouter);
app.use("/write", writeRouter);

/**
 * Starts the server after reading the users data.
 * @returns {Promise<void>} - A promise that resolves when the server is started.
 * @throws {Error} - An error if the server fails to start.
 */
readUsersFile()
  .then(() => {
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}`)
    );
  })
  .catch((err) => {
    console.error("Failed to initialize app", err);
  });
