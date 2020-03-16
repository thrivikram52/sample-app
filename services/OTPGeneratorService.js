import speakeasy from 'speakeasy';

export const generateOTP = function(secret) {
	if(!secret) {
		secret = speakeasy.generateSecret({length: 20}).base32;	
	}
	var token = speakeasy.totp({
		'secret': secret,
		'encoding': 'base32',
		'digits':4
	});
	return {'secret': secret, 'token': token};
};

export const verifyOTP = function(secret, token) {
	var verified = speakeasy.totp.verify({
		'secret': secret,
		'token': token,
		'encoding': 'base32',
		'window' : 4,
		'digits':4
	});
	console.log(verified)
	return verified;
};
