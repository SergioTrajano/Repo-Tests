import { Router } from "express";

import validateSchema from "../middleware/schemaValidation";
import { createUserSchema } from "../schemas/usersSchemas";
import { userController } from "../controllers/usersControllers";

const router = Router();

router.post("/signUp", validateSchema(createUserSchema), userController.signUp);

export default router;