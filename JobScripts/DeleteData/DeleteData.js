import * as _ from 'underscore';

import * as AbstractModels from '../../models/AbstractModels';
import Posts from '../../models/Posts';

export const delete_posts = async() => {
	let selectCondition = {
	}
	await AbstractModels.mongoDelete(Posts, selectCondition);
	console.log("posts deleted executed");
}
