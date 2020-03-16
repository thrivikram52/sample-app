import aws from 'aws-sdk';
import path from 'path';
import uuid from 'uuid';
import * as AWSConfig from '../constants/AWS.json';

aws.config.update({ signatureVersion: 'v4',region: 'ap-south-1',accessKeyId: AWSConfig.s3.accessKeyId, secretAccessKey: AWSConfig.s3.secretAccessKey });

let s3ZipprBucket = new aws.S3();

const bucket_name = AWSConfig.s3.bucket_name;
const expire_sec = AWSConfig.s3.expire_sec;

export const generate_pre_ssigned_url_write = async(req,res,next) => {
    try{
    	var random_no = uuid.v1();

    	var params = {
    		'Bucket': bucket_name,
    		'Key':  random_no + '.jpg',
    		'Expires': expire_sec,
    	};
    	
    	var preSignedUrl = s3ZipprBucket.getSignedUrl('putObject', params);
    	//preSignedUrl = preSignedUrl.replace(/https/, 'http');
        res.data = {
        	"pre-signed-url":preSignedUrl
        };
        next();
    }
    catch(err) {
        console.log('Error in generate_pre_ssigned_url_write : ',err);
        next(ErrorUtils.InternalServerError(err));
    }    
}
