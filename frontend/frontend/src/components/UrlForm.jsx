import { useState } from "react";
import axios from "axios";
import { getAnalytics } from "../services/api";
import DeviceChart from "./DeviceChart";
import BrowserChart from "./BrowserChart";
import { getDetailedAnalytics } from "../services/api";
import TimelineChart from "./TimelineChart";
import { getTimelineAnalytics } from "../services/api";
import { useRef } from "react";
import { motion } from "framer-motion";
import { BASE_URL } from "../services/api";

function UrlForm() {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [analytics, setAnalytics] = useState(null);
    const [details, setDetails] = useState(null);
    const [timeline, setTimeline] = useState(null);
    const containerRef = useRef(null);
    const handleSubmit = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/shorten`, {
                originalUrl: url
            });

            setShortUrl(res.data.shortUrl);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAnalytics = async () => {
        try {
            const code = shortUrl.split("/").pop();
            const data = await getAnalytics(code);
            setAnalytics(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDetailedAnalytics = async () => {
        try {
            const code = shortUrl.split("/").pop();
            const data = await getDetailedAnalytics(code);
            setDetails(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleTimeline = async () => {
        try {
            const code = shortUrl.split("/").pop();
            const data = await getTimelineAnalytics(code);
            setTimeline(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute w-[400px] h-[400px] bg-purple-500 rounded-full blur-[120px] opacity-15 animate-[pulse_6s_infinite] top-[-50px] left-[-50px]"></div>
                <div className="absolute w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[120px] opacity-15 animate-[pulse_6s_infinite] bottom-[-50px] right-[-50px]"></div>
            </div>
            <motion.div
                className="max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
                    URL Analytics Dashboard
                </h1>

                <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg mb-6">

                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="flex-1 bg-transparent border border-white/20 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />

                        <button
                            onClick={handleSubmit}
                            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-5 py-2 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            Shorten
                        </button>
                    </div>

                    {shortUrl && (
                        <div className="mt-4">
                            <p className="font-semibold">Short URL:</p>

                            <a
                                href={shortUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-purple-400 hover:text-purple-300 hover:underline break-all"
                            >
                                {shortUrl}
                            </a>

                            <div className="flex gap-3 mt-4 flex-wrap">
                                <button
                                    onClick={handleAnalytics}
                                    className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-purple-500/30"
                                >
                                    Analytics
                                </button>

                                <button
                                    onClick={handleDetailedAnalytics}
                                    className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-purple-500/30"
                                >
                                    Details
                                </button>

                                <button
                                    onClick={handleTimeline}
                                    className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-purple-500/30"
                                >
                                    Timeline
                                </button>
                            </div>
                        </div>
                    )}

                </div>

                {analytics && (
                    <div className="grid md:grid-cols-2 gap-4 mb-6">

                        <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 transition-all duration-300">
                            <h3 className="font-bold text-lg mb-2">Original URL</h3>
                            <p className="break-all text-gray-300">
                                {analytics.originalUrl}
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 transition-all duration-300">
                            <h3 className="font-bold text-lg mb-2">Total Clicks</h3>
                            <p className="text-4xl font-bold text-purple-600">
                                {analytics.clicks}
                            </p>
                        </div>

                    </div>
                )}

                {details && (
                    <div className="grid md:grid-cols-2 gap-6 mb-6">

                        <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 transition-all duration-300">
                            {/* <h2 className="font-bold mb-2">Device Distribution</h2> */}
                            <DeviceChart data={details.devices} />
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 transition-all duration-300">
                            {/* <h2 className="font-bold mb-2">Browser Distribution</h2> */}
                            <BrowserChart data={details.browsers} />
                        </div>

                    </div>
                )}

                {timeline && (
                    <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg mb-6">
                        {/* <h2 className="font-bold mb-2">Clicks Over Time</h2> */}
                        <TimelineChart data={timeline} />
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default UrlForm;