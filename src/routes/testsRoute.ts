import { Router } from "express";

import validateSchema from "../middleware/schemaValidation";
import validateHeader from "../middleware/validateHeader";
import { createTestSchema } from "../schemas/testsSchemas";
import { testController } from "../controllers/testsControllers";

const router = Router();

router.use(validateHeader);
router.post("/tests", validateSchema(createTestSchema), testController.create);
router.get("/tests/terms", testController.getAllOrderBYTerms);

export default router;