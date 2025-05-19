import jsonWebtoken from "jsonwebtoken";

const createToken = (data) => {
    try {
        const token = jsonWebtoken.sign(data, process.env.JWT_SECRET, {expiresIn: 60*60*24*7});
        return token;
    } catch (error) {
        error.statusCode = 401;
        throw error;
    }
}
const verifyToken = (token) => {
    try {
        const data = jsonWebtoken.verify(token, process.env.JWT_SECRET);
        return data;
    } catch (error) {
        error.statusCode = 401;
        throw error;
    }
}
export {createToken, verifyToken}