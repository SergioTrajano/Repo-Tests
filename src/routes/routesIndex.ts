import { Router } from "express";

import usersRouter from "./usersRoute";
import testsRouter from "./testsRoute";

const router = Router();

router.use(usersRouter);
router.use(testsRouter);

export default router;