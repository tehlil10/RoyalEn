const { JsonMsg } = require("../utility/api_handler");
const services = require("../services");
const authToken = require("../utility/auth_token_utility");

module.exports = async (req, res, next) => {
    try {
        // ✅ get token from header
        const token = req.headers["token"] || req.headers["x-access-token"];

        if (!token) {
            return res.status(401).json(
                JsonMsg(false, null, "Authorization token missing!", 401)
            );
        }

        // ✅ verify token
        const decoded = authToken.verifyToken(token);

        // attach user info
        req.user = decoded;

        next();

    } catch (err) {
        console.error("Auth Error:", err.message);

        // ✅ TOKEN EXPIRED
        if (err.name === "TokenExpiredError") {

            try {
                const decoded = authToken.decodeToken(token);

                if (decoded?.id) {
                    // optional: update user logout / lastActive
                    await services.oemUser.updateUser(
                        { _id: decoded.id },
                        { lastActiveDate: new Date() }
                    );
                }
            } catch (e) {
                console.error("Auto update failed:", e.message);
            }

            return res.status(401).json(
                JsonMsg(false, null, "Token expired!", 401)
            );
        }

        // ✅ INVALID TOKEN
        return res.status(401).json(
            JsonMsg(false, null, "Invalid token!", 401)
        );
    }
};