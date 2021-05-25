import _ from 'underscore';
import * as ErrorUtils from '../commons/utils/ErrorUtils';
import * as AbstractModels from '../models/AbstractModels';
import * as jsValidator from 'json-schema';
import AuditLogs from '../models/AuditLogs';
import * as Schema from '../schema/SchemaMerger';
import {
    ObjectId
} from 'mongodb';


let get_list_of_projects_schema = Schema.get_list_of_projects;


//event type and schema type should be same, its a assumption
export const validate = (req,res,next) => {
    let query = req.query;
    let body = req.body;
    let routeObj = req.routeObj;
    //let schema = routeObj.schema;

    var isValidReqQuery = jsValidator.validate(query,Schema[routeObj.event_type+"_QUERY"]);
    var isValidReqBody = jsValidator.validate(body,Schema[routeObj.event_type+"_BODY"]);
    if(!isValidReqQuery.valid){
        next(ErrorUtils.InvalidSchemaError(JSON.stringify(isValidReqQuery.errors)));
    } else if(!isValidReqBody.valid){
        next(ErrorUtils.InvalidSchemaError(JSON.stringify(isValidReqBody.errors)));
    } else {
        next();
    }
}
