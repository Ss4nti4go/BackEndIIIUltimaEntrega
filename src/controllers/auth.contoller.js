import { authService } from "../services/auth.service.js";
import logger from "../helpers/logger.helper.js";

class AuthController {
    constructor(service) {
        this.service = service;
    }

    register = async (req, res, next) => {
        try {
            const user = await this.service.register(req.body);
            res.json201(user);
        } catch (error) {
            logger.ERROR(`Register failed: ${error.message}`); 
            return res.status(400).render("register", { error: error.message });
        }
    };

    login = async (req, res, next) => {
        try {
            const { token, user } = await this.service.login(req.body);
            const opts = {
                maxAge: 60 * 60 * 24 * 7 * 1000,
                httpOnly: true
            };
            
            res.cookie("token", token, opts).json200({ message: "Logged in", email: user.email });
        } catch (error) {
            logger.ERROR(`Login failed: ${error.message}`);
           
             return res.status(401).render("login", { error: error.message });
        }
    };

    signout = (req, res) => {
        res.clearCookie("token", { httpOnly: true, path: "/" }).json200({ message: "Signed out" });
    };

    online = (req, res) => {
        res.json200({ message: "Token is valid", user: req.user });
    };

    google = async (req, res, next) => {
        try {
            const { token, user } = await this.service.googleLogin(req.body);
            const opts = {
                maxAge: 60 * 60 * 24 * 7 * 1000,
                httpOnly: true
            };
            res.cookie("token", token, opts).json200({ message: "Logged in with Google", user });
        } catch (error) {
            logger.ERROR(`Google login failed: ${error.message}`);
          
            return res.json401({ error: "Google login failed." }); 
        }
    };

    failure = (req, res) => {
        logger.warn("Authentication failure route triggered");
        res.json401({ error: "Authentication failed" });
    };
}

const authController = new AuthController(authService);
export { authController };
