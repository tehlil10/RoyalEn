const services = require("../../services/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {

    // LOGIN
    loginUser: (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        services.oemUser.getUser({ email })
            .then((user) => {

                if (!user) {
                    return Promise.reject({ message: "Invalid credentials", status: 400 });
                }

                return bcrypt.compare(password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            return Promise.reject({ message: "Invalid credentials", status: 400 });
                        }

                        const token = jwt.sign(
                            { id: user._id },
                            process.env.JWT_SECRET,
                            { expiresIn: "1d" }
                        );

                        return Promise.resolve({
                            token,
                            email: user.email
                        });
                    });

            })
            .then((result) => {
                return res.json(result);
            })
            .catch((err) => {
                return res.status(err.status || 500).json({ message: err.message || "Server error" });
            });
    },

    // REGISTER
    registerUser: (req, res) => {
        const { name, email, password, mobileNumber } = req.body;

        services.oemUser.getUser({ email })
            .then((existingUser) => {

                if (existingUser) {
                    return Promise.reject({ message: "User already exists", status: 400 });
                }

                return bcrypt.hash(password, 10)
                    .then((hashed) => {
                        return services.oemUser.createUser({
                            name,
                            email,
                            password: hashed,
                            mobileNumber
                        });
                    });

            })
            .then(() => {
                return res.json({ message: "User created successfully" });
            })
            .catch((err) => {
                return res.status(err.status || 500).json({ message: err.message || "Server error" });
            });
    },

    // LOGOUT
    logoutUser: (req, res) => {
        return res.json({ message: "Logged out successfully" });
    },

    //  PROFILE
    getProfile: (req, res) => {
        return res.json({ message: `Welcome user ${req.user.id}` });
    }

};