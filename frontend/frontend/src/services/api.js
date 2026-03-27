import axios from "axios";

export const BASE_URL = "https://url-analytics-dashboard.onrender.com";

export const getAnalytics = async (code) => {
    const res = await axios.get(`${BASE_URL}/analytics/${code}`);
    return res.data;
};

export const getDetailedAnalytics = async (code) => {
    const res = await axios.get(`${BASE_URL}/analytics/${code}/details`);
    return res.data;
};

export const getTimelineAnalytics = async (code) => {
    const res = await axios.get(`${BASE_URL}/analytics/${code}/timeline`);
    return res.data;
};