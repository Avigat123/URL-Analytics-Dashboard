import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    shortCode: String,
    ip: String,
    device: String,
    browser: String,
    location: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Analytics", analyticsSchema);