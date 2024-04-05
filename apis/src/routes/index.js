import { Router } from 'express';

import version_one_routes from './routefile.routes.js';

const router = Router();
router.use('/v1', version_one_routes);


export default router;