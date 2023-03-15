class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(error) {
        console.log('bad request');  
        return new ApiError(404, error.message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }
    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }
}

module.exports = ApiError