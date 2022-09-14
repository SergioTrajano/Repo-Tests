function unathorized(entity: string) {
    return { code: 401, message: `Invalid ${entity}.` };
}

function notFound(entity: string) {
    return { code: 404, message: `${entity} not found.`}
}

function conflict() {
    return { code: 409, message: `Email already in use.` };
}

function unprocessableEntityError(error: {details: {message: String}[]}) {
    return { code: 422, message: error.details.map(detail => detail.message) };
}

export const errorType = {
    unathorized,
    notFound,
    conflict,
    unprocessableEntityError,
}