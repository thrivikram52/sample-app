export const LOGIN_QUERY = {
    "$schema": "https://json-schema.org/draft-04/schema#",
    "title": "LOGIN_QUERY",
    "type": "object",
    "properties": {
    }
}

export const LOGIN_BODY = {
    "$schema": "https://json-schema.org/draft-04/schema#",
    "title": "LOGIN_BODY",
    "type": "object",
    "properties": {
        "mobile_no": {
            "type":"string",
            "required":true
        },
        "password": {
            "type":"string",
            "required":true
        }
    }
}

export const SEND_OTP_QUERY = {
    "$schema": "https://json-schema.org/draft-04/schema#",
    "title": "SEND_OTP_QUERY",
    "type": "object",
    "properties": {
        "mobile_no":{
            "type":"string",
            "required":true
        },
        "secret":{
            "type":"string"
        }
    }
}

export const SEND_OTP_BODY = {
    "$schema": "https://json-schema.org/draft-04/schema#",
    "title": "SEND_OTP_BODY",
    "type": "object",
    "properties": {
    }
}

export const VALIDATE_OTP_BODY = {
    "$schema": "https://json-schema.org/draft-04/schema#",
    "title": "VALIDATE_OTP_BODY",
    "type": "object",
    "properties": {
        "mobile_no":{
            "type":"string",
            "required":true
        },
        "secret":{
            "type":"string",
            "required":true
        },
        "otp":{
            "type":"string",
            "required":true
        }
    }
}

export const UPDATE_USER_DETAILS_BODY = {
    "$schema": "https://json-schema.org/draft-04/schema#",
    "title": "UPDATE_USER_DETAILS_BODY",
    "type": "object",
    "properties": {
        "first_name":{
            "type":"string"
        },       
        "last_name":{
            "type":"string"
        },       
        "email":{
            "type":"string"
        },       
        "alternate_mobile_no":{
            "type":"string"
        }
    }
}

export const UPDATE_PROFILE_PIC_BODY = {
    "$schema": "https://json-schema.org/draft-04/schema#",
    "title": "UPDATE_PROFILE_PIC_BODY",
    "type": "object",
    "properties": {
        "profile_pic":{
            "type":"string",
            "required":true
        }
    }
}

export const UPDATE_ADDRESS_PROOF_BODY = {
    "$schema": "https://json-schema.org/draft-04/schema#",
    "title": "UPDATE_ADDRESS_PROOF_BODY",
    "type": "object",
    "properties": {
        "address_proof":{
            "type":"object",
            "required": true,
            "properties":{
                "document_type":{
                    "type":"string",
                    "required": true
                },
                "address_proof_front_image_url":{
                    "type":"string"
                },
                "address_proof_back_image_url":{
                    "type":"string"
                }
            }
        }
    }
}

export const UPDATE_AADHAAR_BODY = {
    "$schema": "https://json-schema.org/draft-04/schema#",
    "title": "UPDATE_AADHAAR_BODY",
    "type": "object",
    "properties": {
        "aadhaar":{
            "type":"object",
            "required": true,
            "properties":{
                "aadhaar_no":{
                    "type":"string",
                    "required": true
                },
                "aadhaar_front_image_url":{
                    "type":"string",
                    "required": true
                },
                "aadhaar_back_image_url":{
                    "type":"string",
                    "required": true
                }
            }
        }
    }
}

export const REGISTER_BODY = {
    "$schema": "https://json-schema.org/draft-04/schema#",
    "title": "REGISTER_BODY",
    "type": "object",
    "properties": {
        "mobile_no": {
            "type":"string",
            "required":true
        },
        "password": {
            "type":"string",
            "required":true
        },
        "first_name": {
            "type":"string",
            "required":true
        },
        "last_name": {
            "type":"string",
            "required":true
        }
    }
}
