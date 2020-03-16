import request from 'request';

export const sendSms = async(smsObj) => {
	console.log("SMS content ",smsObj);
	return new Promise(function(resolve,reject){	
		request.post({
		   	url : "",//exotel url
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
	})
}
