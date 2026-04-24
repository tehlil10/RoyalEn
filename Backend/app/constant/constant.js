const dbURL = {    "database":  process.env.DB_URL || "mongodb://127.0.0.1:27017/royal_enfield" };
const PORT = {"port": process.env.PORT || 5000}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE || "1d";

module.exports = {
    'dbURL': dbURL,
    'PORT': PORT,
    'JWT_SECRET':JWT_SECRET,
    'JWT_EXPIRE':JWT_EXPIRE,
}
