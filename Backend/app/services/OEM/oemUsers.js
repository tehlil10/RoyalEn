const models = require("../../models/models");

module.exports = {

    getUser: (query) => {
        return models.oemUsers.findOne(query);
    },

    createUser: (data) => {
        return models.oemUsers.create(data);
    }

};