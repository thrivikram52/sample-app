import * as ErrorType from '../../constants/ErrorConstants.js';

const getErrorObj = (errorObj) => {
    let err = new Error(errorObj.message);
    err.code = errorObj.code;
    return err;
}

export const InvalidRequest = () => {
    return getErrorObj(ErrorType.INVALID_REQUEST);
}

export const InvalidAPIKey = () => {
    return getErrorObj(ErrorType.INVALID_API_KEY);
}

export const InvalidSessionToken = () => {
    return getErrorObj(ErrorType.INVALID_SESSION_TOKEN);
}

export const InvalidAuthorization = () => {
    return getErrorObj(ErrorType.INVALID_AUTHORIZATION);
}

export const BlockListedUser = () => {
    return getErrorObj(ErrorType.BLOCK_LISTED_USER);
}

export const UserNotFoundError = () => {
    return getErrorObj(ErrorType.USER_DOES_NOT_EXIST);
}

export const InvalidPasswordError = () => {
    return getErrorObj(ErrorType.INVALID_PASSWORD);
}

export const InvalidSchemaError = (err) => {
    const errorObj = {
        "code":ErrorType.INVALID_SCHEMA.code,
        "message":ErrorType.INVALID_SCHEMA.message + " " +err,
    }
	return getErrorObj(errorObj);
}

export const InternalServerError = (err) => {
    const errorObj = {
        "code":ErrorType.INVALID_SCHEMA.code,
        "message":err,
    }
	return getErrorObj(errorObj);
}

export const DataNotFound = () => {
	return getErrorObj(ErrorType.DATA_NOT_FOUND);
}

export const MongoError = () => {
	return getErrorObj(ErrorType.MONGO_ERROR);
}

export const DataAlreadyExists = () => {
	return getErrorObj(ErrorType.DATA_ALREADY_EXISTS);
}

export const NotInSurroundingsError = () => {
    return getErrorObj(ErrorType.NOT_IN_SURROUNDINGS);
}

export const IncorrectOTP = () => {
    return getErrorObj(ErrorType.INCORRECT_OTP);
}

export const InvalidUserError = () => {
    return getErrorObj(ErrorType.INVALID_USER);
}

export const InvalidLatLon = () => {
    return getErrorObj(ErrorType.INVALID_LAT_LON);
}

export const InvalidTruckId = () => {
    return getErrorObj(ErrorType.INVALID_TRUCK_ID);
}

export const ExpiredUser = () => {
    return getErrorObj(ErrorType.EXPIRED_USER);
}

export const NotRegisteredUser = () => {
    return getErrorObj(ErrorType.NOT_REGISTERED_USER);
}
