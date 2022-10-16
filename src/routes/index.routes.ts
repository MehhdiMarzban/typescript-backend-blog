import {Router} from "express";

import DecoratorRoutes from "../decorators/routers.decorators";

const router: Router = Router();
router.use(DecoratorRoutes);

export default router;