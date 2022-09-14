import { Router } from "express";

import validateSchema from "../middleware/schemaValidation";
import { createUserSchema, loginUserSchema } from "../schemas/usersSchemas";
import { userController } from "../controllers/usersControllers";

const router = Router();

router.post("/signUp", validateSchema(createUserSchema), userController.signUp);
router.post("/signIn", validateSchema(loginUserSchema), userController.signIn);

export default router;