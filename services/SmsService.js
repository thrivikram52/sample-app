import request from 'request';
var qs = require('qs');
import axios from 'axios';	

export const sendSms = async(smsObj) => {
	console.log("SMS content ",smsObj);
	/*return new Promise(function(resolve,reject){	
		request.post({
		   	uri : "https://zippr1:69c5d5a73f73d5bf5f654c0d79c7b2bf469098d2@@api.exotel.com/v1/Accounts/04048214918/Sms/send",
		   	form:smsObj,
		  	function (error, response, body) {
		  		if(error || !response.body.ok) {
		  			if(error) {
		  				reject(error);	
		  			} else {
		  				reject(response.body);
		  			}		  			
		  		} else {
		  			resolve(body.response);
		  		}
			}
		})
	})*/
	var data = qs.stringify(smsObj);
	  var config = {
		method: 'post',
		url: 'https://zippr1:69c5d5a73f73d5bf5f654c0d79c7b2bf469098d2@twilix.exotel.in/v1/Accounts/zippr1/Sms/send',
		headers: {
		  'Content-Type': 'application/x-www-form-urlencoded'
		},
		data : data
	  };
	  
	  axios(config)
	  .then(function (response) {
		console.log(JSON.stringify(response.data));
	  })
	  .catch(function (error) {
		console.log(error);
	  });
	  
}
