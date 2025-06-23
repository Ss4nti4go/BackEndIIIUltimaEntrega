import errors from "../helpers/errors/errors.js";

const setResponses = (req, res, next) => {
    const { method, originalUrl: url } = req;

    const successResponse = (statusCode, data) => {
        const response = { response: data, method, url };
        res.status(statusCode).json(response);
    };

    const errorResponse = (statusCode, error) => {
        const response = {
            error: error.message,
            status: statusCode,
            method,
            url
        };
        res.status(statusCode).json(response);
    };

    res.json200 = (data) => successResponse(200, data);
    res.json201 = (data) => successResponse(201, data);
    res.json400 = () => errorResponse(400, errors.client);
    res.json401 = () => errorResponse(401, errors.auth);
    res.json403 = () => errorResponse(403, errors.forbidden);
    res.json404 = () => errorResponse(404, errors.notFound);
    res.json500 = () => errorResponse(500, errors.fatal);

    next();
};

export default setResponses;
