import * as ErrorUtils from '../commons/utils/ErrorUtils';
import * as AbstractModels from '../models/AbstractModels';
import Posts from '../models/Posts';
import * as PostsService from '../services/PostsService';
import * as Auth from '../middlewares/Auth';


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
		console.log('Error in get post : ',err);
		next(ErrorUtils.InternalServerError(err));
	}
}

export const create_posts = async(req,res,next) => {
	try{
        const post = req.body.post;
        const tag = req.body.tag;
        const sessionObj = await Auth.get_session_obj(req);
        const mobile_no = sessionObj.mobile_no;
        let doc = {
            "post":post,
            "tag":tag,
            "createdBy" :mobile_no
        }
        await AbstractModels.mongoInsert(Posts,doc);
        res.data = {  
        };
        next();
	}
	catch(err) {
		console.log('Error in create_posts : ',err);
		next(ErrorUtils.InternalServerError(err));
	}
}
