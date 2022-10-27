import { Router } from "express";

import DecoratorRoutes from "../decorators/routers.decorator";

const router: Router = Router();
router.use(DecoratorRoutes);

export default router;
