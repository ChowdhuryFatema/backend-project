import express from "express"
import { UserController } from "./user.controller";

const router = express.Router();

router.post('/create-user', UserController.createStudent)


export const UserRoutes = router;