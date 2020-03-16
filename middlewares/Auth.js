import cryptoRandomString from 'crypto-random-string';
import express from 'express';
import path from 'path';
import _ from 'underscore';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import * as ErrorUtils from '../commons/utils/ErrorUtils';
import * as AbstractModels from '../models/AbstractModels';
import User from '../models/User';
import Client from '../models/Client';
let secreat = "UxZAXfGONYXkvATj552wBQ";
    
import {
    ObjectId
} from 'mongodb';

//Static data can be read using require or fs
let newSessionRoutes = fs.readFileSync(path.resolve(__dirname, 'NewSessionRoutes.json'), 'utf8');
newSessionRoutes = JSON.parse(newSessionRoutes);

let authenticatedRoutes = fs.readFileSync(path.resolve(__dirname,'./AuthenticatedRoutes.json'), 'utf8');
authenticatedRoutes = JSON.parse(authenticatedRoutes);

let noSessionRoutes = require('./NoSessionRoutes.json');
let noAPIKeyRoutes = require('./NoClientIdRoutes.json');
let healthCheckRoutes = require('./HealthCheckRoutes.json');

let routeMaps = [newSessionRoutes,authenticatedRoutes,noSessionRoutes,
noAPIKeyRoutes,healthCheckRoutes];

/*
1.newSessionRoutes
2.authenticatedRoutes(api key check,sessoin token check,Authorize check,blocklist users check)
3.noSessionRoutes(api key check)
4.noAPIKeyRoutes
5.healthCheckRoutes(Dont' store Audits)
6.others

For each req store req, res audits
*/

export const checks = async(req,res,next) => {        
    //req = insert_route_obj_in_req(req);
    const routeCategory = req.routeObj.routeCategory;
    if(routeCategory == "others") {
        let err = ErrorUtils.InvalidRequest();
        next(err);
    } else if(routeCategory == "healthCheckRoutes") {
        next();
    } else if(routeCategory == "noAPIKeyRoutes") {
        next();
    } else if(routeCategory == "noSessionRoutes") {
        let isValidAPIKey = await check_api_key_validity(req,next);
        if(!isValidAPIKey) {
            let err = ErrorUtils.InvalidAPIKey();
            next(err);
        } else {
            next();
        }
    } else if(routeCategory == "authenticatedRoutes") {
        //1.api key check 2.session token check 3.autorization check 4.blocklisted user check
        let isValidAPIKey = await check_api_key_validity(req,next);
        let session = get_session_obj(req);
        if(!session){
            let err = ErrorUtils.InvalidSessionToken();
            next(err);                
        } else {
            let isAuthorizedToAccessRoute = check_autorization(req);
            let isBlockListeduser = await check_block_listed_user(req);
            if(!isValidAPIKey) {
                let err = ErrorUtils.InvalidAPIKey();
                next(err);
            } else if(isBlockListeduser) {
                let err = ErrorUtils.BlockListedUser();
                next(err);
            } else if(!isAuthorizedToAccessRoute) {
                let err = ErrorUtils.InvalidAuthorization();
                next(err);
            } else {
                req.sesssion = session;
                next();
            }
        }
    } else if(routeCategory == "newSessionRoutes") {
        //1.api key check
        let isValidAPIKey = await check_api_key_validity(req,next);
        if(!isValidAPIKey) {
            let err = ErrorUtils.InvalidAPIKey();
            next(err);
        } else {
            next();
        }
    }
}

export const insert_route_obj_in_req = (req) => {
    let originalUrl = req.originalUrl;
    let httpMethod =  req.method;
    let routeObj = get_route_obj(originalUrl,httpMethod);

    routeObj.request_id = cryptoRandomString({length: 15});
    routeObj.start_time = new Date().getTime();
    
    req.routeObj = routeObj;
    return req;        
}

const check_route_category = (req) => {
    let originalUrl = req.originalUrl;
    let httpMethod =  req.method;
    let routeObj = get_route_obj(originalUrl,httpMethod);
    let routeCategory = routeObj.routeCategory;
    return routeCategory;
}

const get_route_obj = (originalUrl, httpMethod) =>{
    let routeObj = {};
    let normalizedURL = originalUrl.toLowerCase().split('\?')[0];
    let index = normalizedURL.lastIndexOf('\/');
    let baseURL = normalizedURL.substring(0, index);
    let isRouteObjFound = false;
    for(let i=0;i<routeMaps.length;i++) {
        let routeMap = routeMaps[i];
        if (routeMap && routeMap[httpMethod]){
            if (routeMap[httpMethod][normalizedURL]){
                routeObj = routeMap[httpMethod][normalizedURL];
                isRouteObjFound = true;
            } else if(routeMap[httpMethod][baseURL + '/:param'] && i != normalizedURL.length - 1) {
                routeObj = routeMap[httpMethod][baseURL + '/:param'];
                isRouteObjFound = true;
            }
            if(isRouteObjFound) {
                routeObj.httpMethod = httpMethod;
                routeObj.baseURL = baseURL;
                routeObj.normalizedURL = normalizedURL;
                routeObj.routeCategory = get_route_category(i);
                break;
            }
        }
    }
    //If route is not found from RoutesMap it shoud be treated
    if(!isRouteObjFound) {
        routeObj.httpMethod = httpMethod;
        routeObj.baseURL = baseURL;
        routeObj.normalizedURL = normalizedURL;
        routeObj.routeCategory = "others";
    }
    return routeObj;
}

const get_route_category = (routeMapsIndex) => {
    let routeCategory = "others";
    if(routeMapsIndex == 0) {
        routeCategory = "newSessionRoutes";
    } else if(routeMapsIndex == 1) {
        routeCategory = "authenticatedRoutes";
    } else if(routeMapsIndex == 2) {
        routeCategory = "noSessionRoutes";
    } else if(routeMapsIndex == 3) {
        routeCategory = "noAPIKeyRoutes";
    } else if(routeMapsIndex == 4) {
        routeCategory = "healthCheckRoutes";
    } 
    return routeCategory;
}

const check_api_key_validity = async(req,next) => {
    try {
        let api_key = req.header('api-key');
        let selectCondition = {
            'api_key':api_key
        };
        let projectCondition = {
            'api_key':1,
            '_id':0
        }
        let isValidAPIKey = await AbstractModels.mongoFindOne(Client,selectCondition,projectCondition);
        return isValidAPIKey;
    }  catch(err){
        next(ErrorUtils.InternalServerError(err));
    }
}

const check_autorization = (req) => {
    let isAuthorizedToAccessRoute = false;
    let session = get_session_obj(req);
    let userType = session.user_type;
    //userType = "truck_owner";//TODO remove
    let routeAutorizedUserTypes = req.routeObj.user_type || [];
    if(routeAutorizedUserTypes && routeAutorizedUserTypes.indexOf(userType)>-1) {
        isAuthorizedToAccessRoute = true
    }
    return isAuthorizedToAccessRoute;
}


const check_block_listed_user = async(req) => {
        let isBlockedUser = false;
        let session = get_session_obj(req);
        let mobile_no = session.mobile_no;
        let selectCondition = {
            "mobile_no":mobile_no,
            "is_blocked_user":true
        };
        let projectCondition = {
            "mobile_number":1,
            "_id":0
        }
        let userObj = await AbstractModels.mongoFindOne(User,selectCondition,projectCondition);        
        if(userObj){
            isBlockedUser = true;
        }
        return isBlockedUser;
}

export const get_session_obj = (req) => {
    let session;
    try {
        let sessiontoken = req.header('sessiontoken');
        session = jwt.verify(sessiontoken, secreat);
        return session;        
    } catch(err){
        return session;
    }
}

export const create_session_obj = (req,data) => {
    let session = jwt.sign(
        data,secreat, { expiresIn: 60*60*24*30 });//default is in sec
    req.session = session;
    return req;
}

