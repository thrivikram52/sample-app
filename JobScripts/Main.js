require("babel-core/register");
require("babel-polyfill");

var crontab = require('node-cron');
var DeleteData = require('../JobScripts/DeleteData/DeleteData');

//Remove posts every 10AM every day
crontab.schedule("10 * * * *", function(){
	DeleteData.delete_posts();
},{
   scheduled: true,
   timezone: "Asia/Kolkata"
 })
