function unathorized() {
    return { code: 401, message: "Invalid credentials." };
}

function conflict() {
    return { code: 409, message: `Email already in use.` };
}

function unprocessableEntityError(error: {details: {message: String}[]}) {
    return { code: 422, message: error.details.map(detail => detail.message) };
}

export const errorType = {
    unathorized,
    conflict,
    unprocessableEntityError,
}