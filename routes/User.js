import {Router} from 'express';
import * as UserController from '../controllers/UserController';
let router = Router();

router.get('/login', UserController.login);
router.get('/send-otp', UserController.send_otp);
router.post('/validate-otp', UserController.validate_otp);
router.get('/user-details', UserController.get_user_details);
router.put('/user-details', UserController.update_user_details);

router.put('/profile-pic', UserController.update_profile_pic);
router.put('/address-proof', UserController.update_address_proof);
router.put('/aadhaar', UserController.update_aadhaar);

router.get('/version', UserController.get_version);

export default router;