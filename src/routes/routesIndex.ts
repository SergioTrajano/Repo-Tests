import { Router } from "express";

import usersRouter from "./usersRoute";

const router = Router();

router.use(usersRouter);

export default router;