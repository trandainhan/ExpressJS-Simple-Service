'use strict';

exports.errorMessages = {
    SERVER_ERROR: {
        httpCode: 500,
        message: {
            'code': '000111',
            'consequence': 'Cannot Respond',
            'reason': 'Server Error',
            'resolution': 'An error occurred in ENGAGEcx. Please contact your system administrator or ENGAGEcx support'
        }
    },
    NOT_FOUND: {
        httpCode: 404,
        message: {
            'code': '000117',
            'consequence': 'Cannot Respond',
            'reason': 'Requested operation/resource unknown',
            'resolution': 'Submit request to a known operation/resource'
        }
    },
    UNPARSABLE_REQUEST: {
        httpCode: 400,
        message: {
            'code': '000110',
            'consequence': 'Operation Failed',
            'reason': 'Opaque Request',
            'resolution': 'Send parseable request'
        }
    }
};