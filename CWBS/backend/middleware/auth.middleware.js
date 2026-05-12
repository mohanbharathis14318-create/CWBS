// Import Modules
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

// Env Config
dotenv.config();

// protectRoute
export const protectRoute = async (req, res, next) => {

    try {

        const accessToken = req.cookies.access_token;

        if (!accessToken)
        {
            return res.status(401).json({ msg: 'Unauthorized - No access token provided' });
        }

        try {

            const Decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

            console.log(Decoded);

            req.user = Decoded;

            next()

        } catch (e) {

            if (e.name === 'TokenExpired') {

                return res.status(401).json({ msg: 'Unauthorized - Token has Expired' });

            }

        }

    } catch (e) {

        console.log("Error in protectedRoute middleware " + e.msg);

        return res.status(401).json({ msg: 'Unauthorized - Invalid access Token' });

    }

};