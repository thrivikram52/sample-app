import mongoose from 'mongoose'
import {Schema} from 'mongoose';
import * as mongoConnect from '../connections/mongoConnect';
var analyticsDb = mongoConnect.analyticsDb;

let AuditLogsSchema = new Schema({
	original_url: {
	    type: String,
	    required: true
	},
	method: {
	    type: String,
	    required: true
	},
	user_agent: {
	    type: String,
	    required: true
	},
	ip_address: {
	    type: String,
	    required: true
	},
	request_id: {
	    type: String,
	    required: true
	},
	status: {
	    type: String
	},
	response_time:{
		type: Number
	},
	username: {
		type : String
	},
	api_key: {
	    type: String
	},
	client_id: {
	    type: String
	},
	event_type: {
	    type: String
	},
	request_body:{
	    type: Object
	},
	response: {
	    type: Object
	},
	created_at: {
		type : Date,
		default : Date.now
	},
	updated_at: {
		type : Date,
		default : Date.now
	}
});

let AuditLogs = analyticsDb.model('AuditLogs', AuditLogsSchema, 'AuditLogs');
export default AuditLogs;

