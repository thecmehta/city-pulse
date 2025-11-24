'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AlertTriangle, Wind, Thermometer, Car, Activity, Droplets, RefreshCw } from 'lucide-react';

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/prediction');
                const json = await res.json();
                setData(json);
                setLoading(false);
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-[#4F46E5] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!data || !data.latest) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#94A3B8]">
                <Activity className="w-16 h-16 mb-4 opacity-50" />
                <h2 className="text-2xl font-semibold text-[#F8FAFC]">Waiting for Data</h2>
                <p className="mt-2">Start the simulation in the IoT Simulator.</p>
            </div>
        );
    }

    const { latest, history } = data;

    const getStatusColor = (level) => {
        switch (level) {
            case 'Low': return 'text-[#22C55E]'; // Success
            case 'Medium': return 'text-[#F59E0B]'; // Warning
            case 'High': return 'text-[#EF4444]'; // Error
            default: return 'text-[#94A3B8]';
        }
    };

    const getStatusBg = (level) => {
        switch (level) {
            case 'Low': return 'bg-[#22C55E]/10 border-[#22C55E]/20';
            case 'Medium': return 'bg-[#F59E0B]/10 border-[#F59E0B]/20';
            case 'High': return 'bg-[#EF4444]/10 border-[#EF4444]/20';
            default: return 'bg-[#1E293B] border-[#334155]';
        }
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1E293B] p-3 rounded-lg border border-[#334155] shadow-xl">
                    <p className="text-[#94A3B8] text-xs mb-1">{new Date(label).toLocaleTimeString()}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-[#F8FAFC]">Dashboard</h1>
                    <p className="text-[#94A3B8] mt-1">Real-time city monitoring</p>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#1E293B] rounded-full border border-[#334155]">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]"></span>
                    </span>
                    <span className="text-xs font-medium text-[#F8FAFC]">Live</span>
                </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Traffic Level */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-[#1E293B] rounded-lg border border-[#334155]">
                            <Car className={`w-5 h-5 ${getStatusColor(latest.trafficLevel)}`} />
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusBg(latest.trafficLevel)} ${getStatusColor(latest.trafficLevel)}`}>
                            {latest.trafficLevel}
                        </span>
                    </div>
                    <p className="text-sm text-[#94A3B8]">Traffic Speed</p>
                    <div className="flex items-baseline mt-1">
                        <span className="text-3xl font-semibold text-[#F8FAFC] mr-1.5">{latest.speed}</span>
                        <span className="text-sm text-[#94A3B8]">km/h</span>
                    </div>
                </div>

                {/* Pollution Level */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-[#1E293B] rounded-lg border border-[#334155]">
                            <AlertTriangle className={`w-5 h-5 ${getStatusColor(latest.pollutionLevel)}`} />
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusBg(latest.pollutionLevel)} ${getStatusColor(latest.pollutionLevel)}`}>
                            {latest.pollutionLevel}
                        </span>
                    </div>
                    <p className="text-sm text-[#94A3B8]">Pollution Risk</p>
                    <div className="flex items-baseline mt-1">
                        <span className={`text-3xl font-semibold ${getStatusColor(latest.pollutionLevel)}`}>{latest.pollutionLevel}</span>
                    </div>
                </div>

                {/* Temperature */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-[#4F46E5]/10 rounded-lg border border-[#4F46E5]/20">
                            <Thermometer className="w-5 h-5 text-[#4F46E5]" />
                        </div>
                        <span className="text-xs font-medium text-[#94A3B8]">{latest.weather}</span>
                    </div>
                    <p className="text-sm text-[#94A3B8]">Temperature</p>
                    <div className="flex items-baseline mt-1">
                        <span className="text-3xl font-semibold text-[#F8FAFC] mr-1.5">{latest.temperature}</span>
                        <span className="text-sm text-[#94A3B8]">°C</span>
                    </div>
                </div>

                {/* Humidity */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-[#22D3EE]/10 rounded-lg border border-[#22D3EE]/20">
                            <Droplets className="w-5 h-5 text-[#22D3EE]" />
                        </div>
                    </div>
                    <p className="text-sm text-[#94A3B8]">Humidity</p>
                    <div className="flex items-baseline mt-1">
                        <span className="text-3xl font-semibold text-[#F8FAFC] mr-1.5">{latest.humidity}</span>
                        <span className="text-sm text-[#94A3B8]">%</span>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card">
                    <h3 className="text-lg font-semibold text-[#F8FAFC] mb-6">Traffic Trend</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={history}>
                                <defs>
                                    <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="createdAt" tick={false} stroke="#94A3B8" axisLine={false} />
                                <YAxis stroke="#94A3B8" axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="speed"
                                    stroke="#4F46E5"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorSpeed)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card">
                    <h3 className="text-lg font-semibold text-[#F8FAFC] mb-6">Environment</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={history}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="createdAt" tick={false} stroke="#94A3B8" axisLine={false} />
                                <YAxis stroke="#94A3B8" axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Line type="monotone" dataKey="temperature" stroke="#EF4444" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="humidity" stroke="#22D3EE" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
