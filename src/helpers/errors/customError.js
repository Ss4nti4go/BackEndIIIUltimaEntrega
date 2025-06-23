class CustomError extends Error {
    constructor({ message, statusCode = 500, name = "Error" }) {
        super(message);
        this.statusCode = statusCode;
        this.name = name;
        Error.captureStackTrace(this, this.constructor);
    }

    static new({ message, statusCode }) {
        return new CustomError({ message, statusCode});
    }
}

export default CustomError;