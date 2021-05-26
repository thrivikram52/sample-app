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
    tag:{
        type: String
    },
    createdBy: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


let Posts = mainDb.model('Posts', PostsSchema, 'Posts');
export default Posts;