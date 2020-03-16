import _ from 'underscore';
import * as ErrorUtils from '../commons/utils/ErrorUtils';
import * as AbstractModels from '../models/AbstractModels';
import AuditLogs from '../models/AuditLogs';

import {
    ObjectId
} from 'mongodb';

export const resSuccessLog = (req,res,next) => {
    let routeCategory;
    if(req.routeObj&& req.routeObj.routeCategory) {
        routeCategory = req.routeObj.routeCategory;
    }
    if(routeCategory != "healthCheckRoutes") {
        auditLogResponse(null,req,res);
    }
    res
    .status(res.statusCode || 200)
    .send({status: true, response: res.data});
}

export const resErrorLog = (err,req,res,next) => {
    auditLogResponse(err,req,res);
    res
    .status(res.statusCode || 200)
    .send(
        {
            status: false, 
            response: {
                code: (err.code || 1000),
                reason: err.message
            }
        }
    );
}

const auditLogResponse = (err,req,res) => {
    let selectCondition = {
        "request_id":req.routeObj.request_id
    };
    let updateCondition = {
        "status":true,
        "response_time": (new Date().getTime() - req.routeObj.start_time)
    }
    if(req.session) {
        updateCondition.mobile_number = req.session.mobile_number;
        updateCondition.client_id = req.session.client_id;
        updateCondition.api_key = req.session.api_key;
    }
    if(req.routeObj){
        updateCondition.routeCategory = req.routeObj.routeCategory;
    }

    if(err) {
        updateCondition.response = {
            code: (err.code || 1000),
            reason: err.message
        }
        updateCondition.status = false;
    } else {
        updateCondition.response = res.data;
    }
    AbstractModels.mongoFindOneAndUpdate(AuditLogs,selectCondition,updateCondition);
}
