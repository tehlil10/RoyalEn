require("dotenv").config();
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const http = require("http");

const  connectDB  = require("./db/config");
const { PORT } = require("./app/constant/constant");

const app = express();

app.use(cors());
app.options("", cors());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// If you don't have /public, you can remove this line
app.use(express.static(__dirname + "/public"));

const api = require("./app/routes/api")
app.use('/api', api)

const httpServer = http.createServer(app)

connectDB()
    .then(() => {
        httpServer.listen(PORT.port, () => {
            console.log(`Server running on port ${PORT.port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to start server:", err);
        process.exit(1);
    });