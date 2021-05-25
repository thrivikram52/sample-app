import {Router} from 'express';
import * as PostsController from '../controllers/PostsController';
let router = Router();

router.get('/post', PostsController.get_posts);
router.post('/create-post', PostsController.create_posts);

export default router;