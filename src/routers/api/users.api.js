import { Router } from "express";
import {
  createUser,
  readUsers,
  destroyUser,
} from "../../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.post("/", createUser);
usersRouter.get("/", readUsers);
usersRouter.delete("/:uid", destroyUser);

export default usersRouter;