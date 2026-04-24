const services = require("../../services");
const mongoose = require("mongoose");

module.exports = {

    getEOLData: (req, res) => {

        const { stage, startDate, endDate } = req.query;

        let query = {
            userId: new mongoose.Types.ObjectId(req.user.id)
        };

        // STAGE FILTER
        if (stage && stage !== "ALL") {
            query.oemStage = stage;
        }

        // DATE FILTER
        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        services.oemEOL.getEOLData(query)
            .then((data) => {

                if (!data || data.length === 0) {
                    return res.status(404).json({ message: "No data found" });
                }

                return res.json({ success: true, data });

            })
            .catch((err) => {
                return res.status(500).json({ message: "Server error" });
            });
    }

};