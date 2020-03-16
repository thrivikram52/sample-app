import mongoose from 'mongoose';
import {Schema} from 'mongoose';

import * as mongoConnect from '../connections/mongoConnect';
var mainDb = mongoConnect.mainDb;

let UserSchema = new Schema({
    password: {
        type: String        
    },
    first_name: {
        type: String
    },
    last_name: {
        required: false,
        type: String
    },
    mobile_no: {
      type: String  
    },
    alternate_mobile_no: {
      type: String  
    },
    email: {
      type: String  
    },
    client_id: {
        required: true,
        type: String
    },
    user_type:{
        type: Array,
        required: true
    },
    sessiontoken : {
        type: String
    },
    profile_pic:{
        type: String
    },
    address_proof:{
        type: Object
    },
    aadhaar:{
        type: Object
    },
    is_blocked_user:{
        type:Boolean
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


let User = mainDb.model('User', UserSchema, 'User');
export default User;