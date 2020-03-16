import cryptoRandomString from 'crypto-random-string';
import _ from 'underscore';
import * as ErrorUtils from '../commons/utils/ErrorUtils';
import * as AbstractModels from '../models/AbstractModels';
import AuditLogs from '../models/AuditLogs';
import * as Auth from './Auth';

import {
    ObjectId
} from 'mongodb';

export const reqLog = (req,res,next) => {
    req = Auth.insert_route_obj_in_req(req);
    const routeCategory = req.routeObj.routeCategory;
    if(routeCategory != "healthCheckRoutes") {
        auditLogRequest(req);
        next();
    } else {
        next();
    }
}

const auditLogRequest = (req) => {
    let doc = {
        "original_url": req.originalUrl,
        "method": req.method,        
        "user_agent": req.headers['user-agent'],
        "ip_address": req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        "request_id": req.routeObj.request_id,
        "event_type":req.routeObj.event_type,
        "request_body":req.body
    };
    const apiKey = req.header('api-key');
    if(apiKey) {
        doc.apiKey = apiKey;
    }
    AbstractModels.mongoInsert(AuditLogs,doc);
}
