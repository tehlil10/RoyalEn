const express = require("express");
const api = express.Router();

const user = require("../functionality/OEM/functionality_oem_user");
const eol = require("../functionality/OEM/functionality_oem_eol");
const verifyToken = require("../middleware/authMiddleware");

// AUTH
api.post("/login", (req, res) => user.loginUser(req, res));
api.post("/register", (req, res) => user.registerUser(req, res));
api.post("/logout", (req, res) => user.logoutUser(req, res));
api.get("/profile", verifyToken, (req, res) => user.getProfile(req, res));

// EOL
api.get("/getEOLData", verifyToken, (req, res) => eol.getEOLData(req, res));

module.exports = api;