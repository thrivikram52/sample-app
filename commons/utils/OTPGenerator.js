var speakeasy = require('speakeasy');

var OTPGenerator = {};

OTPGenerator.generateOTP = function(secret) {
	if(!secret) {
		secret = speakeasy.generateSecret({length: 20}).base32;	
	}
	var token = speakeasy.totp({
		'secret': secret,
		'encoding': 'base32'
	});
	return {'secret': secret, 'token': token};
};

OTPGenerator.verifyOTP = function(secret, token) {
	var verified = speakeasy.totp.verify({
		'secret': secret,
		'token': token,
		'encoding': 'base32',
		'window' : 2
	});
	console.log(verified)
	return verified;
};

module.exports = OTPGenerator;