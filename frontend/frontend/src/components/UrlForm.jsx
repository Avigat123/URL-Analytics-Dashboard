import { useState, useRef } from "react";
import axios from "axios";
import { getAnalytics, getDetailedAnalytics, getTimelineAnalytics, BASE_URL } from "../services/api";
import DeviceChart from "./DeviceChart";
import BrowserChart from "./BrowserChart";
import TimelineChart from "./TimelineChart";
import {
    Link2,
    ArrowRight,
    Copy,
    ExternalLink,
    BarChart2,
    Monitor,
    Globe,
    MousePointerClick,
    Check,
    RefreshCw,
    Activity,
} from "lucide-react";

// ─── Metric Card ─────────────────────────────────────────────────────────────
function MetricCard({ icon: Icon, label, value, accent }) {
    return (
        <div className="bg-[#18181B] border border-[#3F3F46] rounded-xl p-4 flex flex-col gap-2 hover:border-[#52525B] transition-colors duration-200">
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#A1A1AA] uppercase tracking-wider">{label}</span>
                <span className="p-1.5 rounded-md bg-[#27272A]">
                    <Icon size={14} className={accent || "text-[#A1A1AA]"} />
                </span>
            </div>
            <p className="text-2xl font-bold text-[#FAFAFA] tabular-nums leading-none">{value}</p>
        </div>
    );
}

// ─── Chart Card ──────────────────────────────────────────────────────────────
function ChartCard({ children, className = "" }) {
    return (
        <div className={`bg-[#18181B] border border-[#3F3F46] rounded-xl p-5 ${className}`}>
            {children}
        </div>
    );
}

// ─── Section Label ───────────────────────────────────────────────────────────
function SectionLabel({ children }) {
    return (
        <p className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-widest mb-3">{children}</p>
    );
}

// ─── Main Form ───────────────────────────────────────────────────────────────
function UrlForm() {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [analytics, setAnalytics] = useState(null);
    const [details, setDetails] = useState(null);
    const [timeline, setTimeline] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingSection, setLoadingSection] = useState(null);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");
    const analyticsRef = useRef(null);

    // ── Handlers ─────────────────────────────────────────────────────────────
    const handleSubmit = async () => {
        if (!url.trim()) {
            setError("Please enter a URL.");
            return;
        }
        setError("");
        setLoading(true);
        setShortUrl("");
        setAnalytics(null);
        setDetails(null);
        setTimeline(null);
        try {
            const res = await axios.post(`${BASE_URL}/shorten`, { originalUrl: url });
            setShortUrl(res.data.shortUrl);
        } catch (err) {
            setError("Failed to shorten URL. Please check the address and try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSubmit();
    };

    const handleLoadAll = async () => {
        if (!shortUrl) return;
        const code = shortUrl.split("/").pop();
        setLoadingSection("all");
        try {
            const [analyticsData, detailsData, timelineData] = await Promise.all([
                getAnalytics(code),
                getDetailedAnalytics(code),
                getTimelineAnalytics(code),
            ]);
            setAnalytics(analyticsData);
            setDetails(detailsData);
            setTimeline(timelineData);
            setTimeout(() => {
                analyticsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingSection(null);
        }
    };

    const handleAnalytics = async () => {
        const code = shortUrl.split("/").pop();
        setLoadingSection("analytics");
        try {
            const data = await getAnalytics(code);
            setAnalytics(data);
        } catch (err) { console.error(err); }
        finally { setLoadingSection(null); }
    };

    const handleDetailedAnalytics = async () => {
        const code = shortUrl.split("/").pop();
        setLoadingSection("details");
        try {
            const data = await getDetailedAnalytics(code);
            setDetails(data);
        } catch (err) { console.error(err); }
        finally { setLoadingSection(null); }
    };

    const handleTimeline = async () => {
        const code = shortUrl.split("/").pop();
        setLoadingSection("timeline");
        try {
            const data = await getTimelineAnalytics(code);
            setTimeline(data);
        } catch (err) { console.error(err); }
        finally { setLoadingSection(null); }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // ── Derived metrics ───────────────────────────────────────────────────────
    const deviceCount = details ? Object.keys(details.devices || {}).length : 0;
    const browserCount = details ? Object.keys(details.browsers || {}).length : 0;
    const countryCount = details ? Object.keys(details.locations || {}).length : null;

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans">

            {/* ── Header ─────────────────────────────────────────────────────── */}
            <header className="border-b border-[#27272A] bg-[#09090B] sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#10B981] flex items-center justify-center flex-shrink-0">
                            <Activity size={14} className="text-[#09090B]" strokeWidth={2.5} />
                        </div>
                        <span className="font-semibold text-[#FAFAFA] text-sm tracking-tight">LinkMetrics</span>
                    </div>
                    <span className="hidden sm:block text-[#3F3F46] text-sm">·</span>
                    <span className="hidden sm:block text-xs text-[#52525B]">Track and analyze URL performance</span>
                </div>
            </header>

            {/* ── Main ───────────────────────────────────────────────────────── */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">

                {/* ── Create Short Link Card ────────────────────────────────── */}
                <section>
                    <SectionLabel>Create Short Link</SectionLabel>
                    <div className="bg-[#18181B] border border-[#3F3F46] rounded-xl p-5 animate-fade-in">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <Link2
                                    size={15}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#52525B]"
                                />
                                <input
                                    id="url-input"
                                    type="url"
                                    placeholder="https://your-destination-url.com"
                                    value={url}
                                    onChange={(e) => { setUrl(e.target.value); setError(""); }}
                                    onKeyDown={handleKeyDown}
                                    className="w-full bg-[#27272A] border border-[#3F3F46] text-[#FAFAFA] placeholder-[#52525B] pl-9 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200"
                                />
                            </div>
                            <button
                                id="shorten-btn"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] disabled:opacity-60 disabled:cursor-not-allowed text-[#09090B] font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors duration-200 whitespace-nowrap"
                            >
                                {loading ? (
                                    <RefreshCw size={14} className="animate-spin" />
                                ) : (
                                    <>
                                        Generate Link
                                        <ArrowRight size={14} />
                                    </>
                                )}
                            </button>
                        </div>

                        {error && (
                            <p className="mt-2.5 text-xs text-[#EF4444]">{error}</p>
                        )}
                    </div>
                </section>

                {/* ── Generated Link Card ───────────────────────────────────── */}
                {shortUrl && (
                    <section className="animate-slide-up">
                        <SectionLabel>Generated Link</SectionLabel>
                        <div className="bg-[#18181B] border border-[#3F3F46] rounded-xl p-5">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-[#A1A1AA] mb-1">Short URL</p>
                                    <a
                                        id="short-url-link"
                                        href={shortUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[#10B981] hover:text-[#34D399] text-sm font-medium break-all transition-colors duration-150"
                                    >
                                        {shortUrl}
                                    </a>
                                </div>

                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button
                                        id="copy-btn"
                                        onClick={handleCopy}
                                        className="flex items-center gap-1.5 bg-[#27272A] hover:bg-[#3F3F46] border border-[#3F3F46] hover:border-[#52525B] text-[#A1A1AA] hover:text-[#FAFAFA] px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                                    >
                                        {copied ? (
                                            <><Check size={12} className="text-[#10B981]" /> Copied</>
                                        ) : (
                                            <><Copy size={12} /> Copy</>
                                        )}
                                    </button>

                                    <a
                                        id="open-link-btn"
                                        href={shortUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-1.5 bg-[#27272A] hover:bg-[#3F3F46] border border-[#3F3F46] hover:border-[#52525B] text-[#A1A1AA] hover:text-[#FAFAFA] px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                                    >
                                        <ExternalLink size={12} />
                                        Open
                                    </a>
                                </div>
                            </div>

                            {/* ── Analytics Trigger Buttons ─────────────────── */}
                            <div className="mt-4 pt-4 border-t border-[#27272A] flex flex-wrap gap-2">
                                <button
                                    id="load-all-btn"
                                    onClick={handleLoadAll}
                                    disabled={loadingSection === "all"}
                                    className="flex items-center gap-1.5 bg-[#10B981] hover:bg-[#059669] disabled:opacity-60 text-[#09090B] font-semibold px-3 py-1.5 rounded-md text-xs transition-colors duration-200"
                                >
                                    {loadingSection === "all" ? (
                                        <RefreshCw size={11} className="animate-spin" />
                                    ) : (
                                        <BarChart2 size={11} />
                                    )}
                                    Load Analytics
                                </button>

                                <button
                                    id="analytics-btn"
                                    onClick={handleAnalytics}
                                    disabled={loadingSection === "analytics"}
                                    className="flex items-center gap-1.5 bg-[#27272A] hover:bg-[#3F3F46] border border-[#3F3F46] text-[#A1A1AA] hover:text-[#FAFAFA] px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200"
                                >
                                    {loadingSection === "analytics" && <RefreshCw size={11} className="animate-spin" />}
                                    Overview
                                </button>

                                <button
                                    id="details-btn"
                                    onClick={handleDetailedAnalytics}
                                    disabled={loadingSection === "details"}
                                    className="flex items-center gap-1.5 bg-[#27272A] hover:bg-[#3F3F46] border border-[#3F3F46] text-[#A1A1AA] hover:text-[#FAFAFA] px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200"
                                >
                                    {loadingSection === "details" && <RefreshCw size={11} className="animate-spin" />}
                                    Devices & Browsers
                                </button>

                                <button
                                    id="timeline-btn"
                                    onClick={handleTimeline}
                                    disabled={loadingSection === "timeline"}
                                    className="flex items-center gap-1.5 bg-[#27272A] hover:bg-[#3F3F46] border border-[#3F3F46] text-[#A1A1AA] hover:text-[#FAFAFA] px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200"
                                >
                                    {loadingSection === "timeline" && <RefreshCw size={11} className="animate-spin" />}
                                    Timeline
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {/* ── Analytics Overview Metrics ────────────────────────────── */}
                {analytics && (
                    <section ref={analyticsRef} className="animate-slide-up">
                        <SectionLabel>Overview</SectionLabel>

                        {/* Original URL */}
                        <div className="bg-[#18181B] border border-[#3F3F46] rounded-xl px-4 py-3 mb-4 flex items-start gap-3">
                            <Globe size={14} className="text-[#52525B] mt-0.5 flex-shrink-0" />
                            <div className="min-w-0">
                                <p className="text-xs text-[#A1A1AA] mb-0.5">Destination URL</p>
                                <p className="text-sm text-[#FAFAFA] break-all">{analytics.originalUrl}</p>
                            </div>
                        </div>

                        {/* Metric Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            <MetricCard
                                icon={MousePointerClick}
                                label="Total Clicks"
                                value={analytics.clicks ?? 0}
                                accent="text-[#10B981]"
                            />
                            <MetricCard
                                icon={Monitor}
                                label="Device Types"
                                value={deviceCount || (details ? deviceCount : "—")}
                                accent="text-[#34D399]"
                            />
                            <MetricCard
                                icon={BarChart2}
                                label="Browsers"
                                value={browserCount || (details ? browserCount : "—")}
                                accent="text-[#6EE7B7]"
                            />
                            <MetricCard
                                icon={Globe}
                                label="Countries"
                                value={countryCount !== null ? countryCount : "—"}
                                accent="text-[#A7F3D0]"
                            />
                        </div>
                    </section>
                )}

                {/* ── Device & Browser Charts ───────────────────────────────── */}
                {details && (
                    <section className="animate-slide-up">
                        <SectionLabel>Distribution</SectionLabel>
                        <div className="grid md:grid-cols-2 gap-4">
                            <ChartCard>
                                <DeviceChart data={details.devices} />
                            </ChartCard>
                            <ChartCard>
                                <BrowserChart data={details.browsers} />
                            </ChartCard>
                        </div>
                    </section>
                )}

                {/* ── Timeline Chart ────────────────────────────────────────── */}
                {timeline && (
                    <section className="animate-slide-up">
                        <SectionLabel>Click Activity</SectionLabel>
                        <ChartCard>
                            <TimelineChart data={timeline} />
                        </ChartCard>
                    </section>
                )}

            </main>

            {/* ── Footer ─────────────────────────────────────────────────────── */}
            <footer className="border-t border-[#27272A] mt-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-12 flex items-center">
                    <p className="text-xs text-[#52525B]">LinkMetrics — URL analytics platform</p>
                </div>
            </footer>

        </div>
    );
}

export default UrlForm;