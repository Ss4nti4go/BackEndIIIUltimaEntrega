import CustomError from "../helpers/errors/customError.js";
import errors from "../helpers/errors/errors.js";

const setResponses = (req, res, next) => {
    const { method, originalUrl: url } = req
    const succesResponse = (statusCode, data) => {
        const response = { response: data, method, url };
        res.status(statusCode).json(response);
    }
    const errorResponse = (error) => CustomError.new(error);

    
    res.json200 = (data) => succesResponse(200, data);
    res.json201 = (data) => succesResponse(201, data);
    res.json400 = () => errorResponse(400, errors.client);
    res.json401 = () => errorResponse(401, errors.auth);
    res.json403 = () => errorResponse(403, errors.forbidden);
    res.json404 = () => errorResponse(404, errors.notFound);
    res.json500 = () => errorResponse(500, errors.fatal);
    next();

};

export default setResponses;