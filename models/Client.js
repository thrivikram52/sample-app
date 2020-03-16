import mongoose from 'mongoose';
import {Schema} from 'mongoose';

import * as mongoConnect from '../connections/mongoConnect';
var mainDb = mongoConnect.mainDb;

let ClientSchema = new Schema({
    api_key: {
        type: String
    }
});


let Client = mainDb.model('Client', ClientSchema, 'Client');
export default Client;