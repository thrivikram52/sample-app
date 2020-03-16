import {Router} from 'express';
import * as ImageController from '../controllers/ImageController';
let router = Router();

router.get('/pre-signed-url-write', ImageController.generate_pre_ssigned_url_write);

export default router;