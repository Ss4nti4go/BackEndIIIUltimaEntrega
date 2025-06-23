import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userManager } from "../dao/managers/mongo.manager.js";
import config from "../config/process.config.js";
import CustomError from "../helpers/errors/customError.js";
import cartModel from "../dao/models/cart.model.js";

class AuthService {
    async register(data) {
        const { email, password, first_name, last_name, full_name, age } = data;


        // Validación básica
        if (!email || !password || !first_name || !last_name || !full_name || !age) {
            throw CustomError.new({ statusCode: 400, message: "Missing required fields" });
        }

        const existingUser = await userManager.readOne({ email });
        if (existingUser) {
            throw CustomError.new({ statusCode: 400, message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userManager.createOne({ ...data, password: hashedPassword });
    
        const newCart = await cartModel.create({
            user: user._id, 
            products: [],
        });

        user.cart = newCart._id;
        await user.save();
       
        return user;
    }

    async login(data) {
        const { email, password } = data;

        if (!email || !password) {
            throw CustomError.new({ statusCode: 400, message: "Email and password are required" });
        }

        const user = await userManager.readOne({ email });
        if (!user) {
            throw CustomError.new({ statusCode: 401, message: "User not found" });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw CustomError.new({ statusCode: 401, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { user_id: user._id, role: user.role, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return { user, token };
    }

    async googleLogin(data) {
        const { email, full_name } = data;

        if (!email || !full_name) {
            throw CustomError.new({ statusCode: 400, message: "Missing Google auth data" });
        }

        let user = await userManager.readOne({ email });
        if (!user) {
            user = await userManager.createOne({
                email,
                full_name,
                password: "google_auth",
                age: 0,
                role: "user"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return { user, token };
    }
    async SingOut(req, res) {
        res.clearCookie("token").json200({ message: "Signed out" });
    }
}

const authService = new AuthService();
export { authService };
