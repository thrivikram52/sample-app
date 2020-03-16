import {Router} from 'express';
import * as HealthController from '../controllers/HealthController';
let router = Router();

router.get('/health-check', HealthController.health_check);
export default router;