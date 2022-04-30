const mongoose = require("mongoose");

const KaraokeSchema = new mongoose.Schema(
    {
        userId: { type: String },
        videoLink: { type: String },
        score:{ type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Karaoke", KaraokeSchema);
