import bcrypt from 'bcrypt';
import _ from 'underscore';

export const setSessionAttributesForUser = (session, user) => {
    session.userID = user._id;
    session.userType = user.user_type;
    session.username = user.username;
    session.mobile_no = user.primary_phone;
    session.name = user.name;
    session.profile_image_url = session.profile_image_url;
    session.firebase_token = user.firebase_token;
    session.ddn = user.ddn;
    session.state = user.state;
    session.city = user.city;
    session.district = user.district;
    session.neighbourhood_id = user.neighbourhood_id;
}


export const isPasswordValid = (password, hash) => {
    return new Promise(function (resolve, reject) {
        try {
            bcrypt.compare(password, hash, function (err, res) {
                if (res == true) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        } catch (e) {
            reject(e);
        }
    })
};

export const addSessionTokenToResponse = (req, res) => {
    res.setHeader('x-zippr-sessiontoken', req.sessionID);

    if (!res.data) {
        res.data = {};
    }
    res.data['x-zippr-sessiontoken'] = req.sessionID;
}

export const getHashedPassword = (password) => {
	return new Promise(function (resolve, reject) {
		bcrypt.genSalt(10, function (err, salt) {
			bcrypt.hash(password, salt, function (err, hash) {
				resolve(hash);
			});
		});
	});
}