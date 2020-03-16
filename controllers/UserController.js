import * as ErrorUtils from '../commons/utils/ErrorUtils';
import * as AbstractModels from '../models/AbstractModels';
import User from '../models/User';
import Client from '../models/Client';
import * as Auth from '../middlewares/Auth';
import * as OTPGeneratorService from '../services/OTPGeneratorService';
import * as SmsService from '../services/SmsService';

export const login = async(req,res,next) => {
	try{
        const mobile_no = req.body.mobile_no;
        const password = req.body.password;
        let selectCondition = {
        	"mobile_no":mobile_no,
        	"password":password
        }
        let projectCondition = {
            "_id":0,
        	"first_name":1,
            "last_name":1,
            "mobile_no":1
        }
        let userObj = await AbstractModels.mongoFindOne(User,selectCondition,projectCondition);

        req = Auth.create_session_obj(req,userObj);
        res.data = {
        	"user_details":userObj,
            "sessiontoken":req.session
        };
        next();
	}
	catch(err) {
		console.log('Error in login : ',err);
		next(ErrorUtils.InternalServerError(err));
	}
}


export const send_otp = async (req, res, next) => {
    try {
        const { mobile_no, secret } = req.query;
        let selectCondition = {
            "mobile_no":mobile_no            
        }
        let isRegisteredPartner = await AbstractModels.mongoFindOne(User,selectCondition);
        if(!isRegisteredPartner) {
            console.log("Not registered user");
            next(ErrorUtils.NotRegisteredUser());
        }else {
            
            let otpObj = OTPGeneratorService.generateOTP(secret);
            let dataObj = {
              'recipient': mobile_no,
              'otp': otpObj.token
            };
            let smsContent = "%d is your zippr OTP. Please do not share this with anyone - zippr Team."
            smsContent = smsContent.replace("%d",otpObj.token);
            let smsObj = {
                "From":"zipprIO",
                "To":mobile_no,
                "Body":smsContent
            }
            SmsService.sendSms(smsObj);
            //TODO remove otp in response, it should be sent via sms gateways
            res.data = {'mobile_no':mobile_no, 'secret': otpObj.secret, 'otp': otpObj.token };
            next();            
        }
    } catch(err) {
        next(ErrorUtils.InternalServerError(err));
    }
};

/*
1.Validate otp
2.Get client Id from api_key
3.Create session from mobile_no and client_id
4.If user object exists update with session otherwise create with session
*/
export const validate_otp = async (req, res, next) => {
    try {
        const { mobile_no, secret, otp } = req.body;
        let response = await OTPGeneratorService.verifyOTP(secret, otp);
        let selectCondition = {
            "mobile_no":mobile_no
        }
        let isRegisteredPartner = await AbstractModels.mongoFindOne(User,selectCondition);
        if(!isRegisteredPartner) {
            console.log("Not registered user");
            next(ErrorUtils.NotRegisteredUser());
        } else if(response){
            selectCondition = {
                "api_key": req.header('api-key')
            }
            const clientObj = await AbstractModels.mongoFindOne(Client,selectCondition);
            const client_id = clientObj._id;
            let userObj = {
                "mobile_no":mobile_no,
                "client_id":client_id
            }
            req = Auth.create_session_obj(req,userObj);
            userObj.session = req.session;

            selectCondition = {
                "mobile_no":mobile_no,
                "client_id":client_id
            }
            const updateCondition = {
                "$set":{
                    "sessiontoken": req.session,
                    'created_at': new Date(),
                    'updated_at': new Date()
                } 
            }
            await AbstractModels.mongoUpsertOne(User,selectCondition,updateCondition);
            res.data = {'sessiontoken' : req.session};
            next();
        } else {
            console.log("error occured");
            next(ErrorUtils.IncorrectOTP());
        }
    } catch(err) {
        next(ErrorUtils.InternalServerError(err));
    }
};

export const get_user_details = async (req,res,next) => {
    try {
        const sessionObj = await Auth.get_session_obj(req);
        const mobile_no = sessionObj.mobile_no;
        const selectCondition = {
            "mobile_no":mobile_no
        };
        const projectCondition = {
            "_id":0,
            "mobile_no":1,
            "first_name":1,
            "last_name":1,
            "alternate_mobile_no":1,
            "email":1,
            "aadhaar":1,
            "address_proof":1,
            "profile_pic":1
        };
        let userObj = await AbstractModels.mongoFindOne(User,selectCondition,projectCondition);
        res.data = userObj;
        next();
    }catch(err){
        next(ErrorUtils.InternalServerError(err));
    }
}

export const update_user_details = async (req,res,next) => {
    try {
        const { first_name,last_name,alternate_mobile_no,email } = req.body;
        const sessionObj = await Auth.get_session_obj(req);
        const mobile_no = sessionObj.mobile_no;
        const selectCondition = {
            "mobile_no":mobile_no
        };
        const updateCondition = {
            first_name,
            last_name,
            alternate_mobile_no,
            email
        };
        await AbstractModels.mongoUpdateOne(User,selectCondition,updateCondition);
        res.data = {};
        next();
    }catch(err){
        next(ErrorUtils.InternalServerError(err));
    }
}

export const update_profile_pic = async (req,res,next) => {
    try {
        const sessionObj = await Auth.get_session_obj(req);
        const mobile_no = sessionObj.mobile_no;
        const selectCondition = {
            "mobile_no":mobile_no
        };
        const updateCondition = {
            "profile_pic" : req.body.profile_pic
        };
        await AbstractModels.mongoUpdateOne(User,selectCondition,updateCondition);
        res.data = {};
        next();
    }catch(err){
        next(ErrorUtils.InternalServerError(err));
    }
}

export const update_address_proof = async (req,res,next) => {
    try {
        const sessionObj = await Auth.get_session_obj(req);
        const mobile_no = sessionObj.mobile_no;
        const selectCondition = {
            "mobile_no":mobile_no
        };
        const updateCondition = {
            "address_proof" : {
                "address_proof_front_image_url":req.body.address_proof.address_proof_front_image_url,
                "address_proof_back_image_url":req.body.address_proof.address_proof_back_image_url,
                "document_type":req.body.address_proof.document_type
            }
        };
        await AbstractModels.mongoUpdateOne(User,selectCondition,updateCondition);
        res.data = {};
        next();
    }catch(err){
        next(ErrorUtils.InternalServerError(err));
    }
}

export const update_aadhaar = async (req,res,next) => {
    try {
        const sessionObj = await Auth.get_session_obj(req);
        const mobile_no = sessionObj.mobile_no;
        const selectCondition = {
            "mobile_no":mobile_no
        };
        const updateCondition = {
            "aadhaar" : {
                "aadhaar_no":req.body.aadhaar.aadhaar_no,
                "aadhaar_front_image_url":req.body.aadhaar.aadhaar_front_image_url,
                "aadhaar_back_image_url":req.body.aadhaar.aadhaar_back_image_url
            }
        };
        await AbstractModels.mongoUpdateOne(User,selectCondition,updateCondition);
        res.data = {};
        next();
    }catch(err){
        next(ErrorUtils.InternalServerError(err));
    }
}

export const get_version = async (req, res, next) => {
    try {
        res.data = {'version':'1.1.0','url':'zippr.io' };
        next();
    } catch(err) {
        next(ErrorUtils.InternalServerError(err));
    }
};

