const models = require("../../models/models");

module.exports = {
    getEolData:(query) => {
        return models.oemEOLData.find(query)
            .then((data) => Promise.resolve(data))
            .catch((err) => Promise.reject(err));
    }
}