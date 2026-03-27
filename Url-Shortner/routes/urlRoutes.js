import express from "express";
import { nanoid } from "nanoid";
import Url from "../models/Url.js";
import Analytics from "../models/Analytics.js";
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";

const router = express.Router();

// POST /shorten
router.post("/shorten", async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({ message: "URL is required" });
        }

        const shortCode = nanoid(8);

        const newUrl = new Url({
            originalUrl,
            shortCode
        });

        await newUrl.save();

        res.json({
            shortUrl: `${process.env.BASE_URL}/${shortCode}`
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


// GET clicks over time
router.get("/analytics/:code/timeline", async (req, res) => {
    try {
        const { code } = req.params;

        const data = await Analytics.find({ shortCode: code });

        if (!data.length) {
            return res.status(404).json({ message: "No analytics found" });
        }

        const clicksByDate = {};

        data.forEach((item) => {
            const date = item.timestamp.toISOString().split("T")[0]; // YYYY-MM-DD

            clicksByDate[date] = (clicksByDate[date] || 0) + 1;
        });

        res.json(clicksByDate);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


// GET detailed analytics
router.get("/analytics/:code/details", async (req, res) => {
    try {
        const { code } = req.params;

        const data = await Analytics.find({ shortCode: code });

        if (!data.length) {
            return res.status(404).json({ message: "No analytics found" });
        }

        // total clicks
        const totalClicks = data.length;

        // device stats
        const devices = {};
        const browsers = {};

        data.forEach((item) => {
            // device count
            devices[item.device] = (devices[item.device] || 0) + 1;

            // browser count
            browsers[item.browser] = (browsers[item.browser] || 0) + 1;
        });

        res.json({
            totalClicks,
            devices,
            browsers
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});



// GET analytics for a short URL
router.get("/analytics/:code", async (req, res) => {
    try {
        const { code } = req.params;

        const url = await Url.findOne({ shortCode: code });

        if (!url) {
            return res.status(404).json({ message: "URL not found" });
        }

        res.json({
            originalUrl: url.originalUrl,
            shortCode: url.shortCode,
            clicks: url.clicks,
            createdAt: url.createdAt
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


//GET /:code
router.get("/:code", async (req, res) => {
    try {
        const { code } = req.params;

        const url = await Url.findOne({ shortCode: code });

        if (!url) {
            return res.status(404).send("URL not found");
        }

        // 📊 Get IP
        const ip =
            req.headers["x-forwarded-for"] || req.socket.remoteAddress;

        // 🖥 Device + browser
        const parser = new UAParser(req.headers["user-agent"]);
        const device = parser.getDevice().type || "desktop";
        const browser = parser.getBrowser().name;

        // 🌍 Location
        const geo = geoip.lookup(ip);
        const location = geo ? geo.country : "Unknown";

        // 💾 Save analytics
        await Analytics.create({
            shortCode: code,
            ip,
            device,
            browser,
            location
        });

        // 🔢 increment clicks
        url.clicks += 1;
        await url.save();

        res.redirect(url.originalUrl);

    } catch (err) {
        res.status(500).send("Server error");
    }
});

export default router;