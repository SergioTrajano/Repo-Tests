function conflict() {
    return { code: 409, message: `Email already in use.` };
}

function unprocessableEntityError(error: {details: {message: String}[]}) {
    return { code: 422, message: error.details.map(detail => detail.message) };
}

export const errorType = {
    conflict,
    unprocessableEntityError,
}