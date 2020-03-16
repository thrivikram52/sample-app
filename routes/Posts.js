import {Router} from 'express';
import * as PostsController from '../controllers/PostsController';
let router = Router();

router.get('/post', PostsController.get_posts);
export default router;