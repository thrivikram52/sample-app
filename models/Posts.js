import mongoose from 'mongoose';
import {Schema} from 'mongoose';

import * as mongoConnect from '../connections/mongoConnect';
var mainDb = mongoConnect.mainDb;

let PostsSchema = new Schema({
    post: {
        type: String
    },
    post_id:{
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    } 
});


let Posts = mainDb.model('Posts', PostsSchema, 'Posts');
export default Posts;