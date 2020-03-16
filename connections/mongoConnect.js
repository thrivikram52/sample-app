import config from '../config/index.js';
import mongoose from 'mongoose';

export const mainDb =  mongoose.createConnection(config.dbconfig.conn_string);
if(mainDb){
	console.log("Config ",config.dbconfig.conn_string)
}
else{
	console.log("Unable to connect to mainDb")
}
export const analyticsDb =  mongoose.createConnection(config.analyticsDbConfig.conn_string);
if(analyticsDb){
	console.log("Config ",config.analyticsDbConfig.conn_string)
}
else{
	console.log("Unable to connect analyticsDb")
}