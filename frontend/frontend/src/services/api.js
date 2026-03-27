import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getAnalytics = async (code) => {
    const res = await axios.get(`${BASE_URL}/analytics/${code}`);
    return res.data;
};
export const getDetailedAnalytics = async (code) => {
    const res = await axios.get(`http://localhost:5000/analytics/${code}/details`);
    return res.data;
};
export const getTimeline = async (code) => {
    const res = await axios.get(`${BASE_URL}/analytics/${code}/timeline`);
    return res.data;
};

export const getTimelineAnalytics = async (code) => {
    const res = await axios.get(`http://localhost:5000/analytics/${code}/timeline`);
    return res.data;
};