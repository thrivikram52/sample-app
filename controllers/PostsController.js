import * as ErrorUtils from '../commons/utils/ErrorUtils';
import * as AbstractModels from '../models/AbstractModels';
import Posts from '../models/Posts';
import * as PostsService from '../services/PostsService';

export const get_posts = async(req,res,next) => {
	try{
        const postId = req.query.post_id;
        let selectCondition = {
        	"post_id":postId
        }
        let projectCondition = {
        	"post":1,
            "createdBy":1,
        	"_id":0,
        }
        let postObjs = await AbstractModels.mongoFind(Posts,selectCondition,projectCondition);
        postObjs = PostsService.append_text(postObjs);
        res.data = {
        	"posts":postObjs
        };
        next();
	}
	catch(err) {
		console.log('Error in get student : ',err);
		next(ErrorUtils.InternalServerError(err));
	}
}
