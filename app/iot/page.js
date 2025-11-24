'use client';

import { useState, useEffect } from 'react';
import { Send, Play, Square, Activity, Terminal, Cpu, Wifi } from 'lucide-react';

export default function IoTSimulator() {
    const [isSimulating, setIsSimulating] = useState(false);
    const [logs, setLogs] = useState([]);
    const [formData, setFormData] = useState({
        speed: 45,
        temperature: 25,
        humidity: 60,
        weather: 'Sunny',
        timeOfDay: 'Day',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'speed' || name === 'temperature' || name === 'humidity' ? Number(value) : value,
        }));
    };

    const sendData = async (data) => {
        try {
            const res = await fetch('/api/iot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();

            const logEntry = {
                id: Date.now(),
                time: new Date().toLocaleTimeString(),
                status: res.ok ? 'OK' : 'ERR',
                details: res.ok
                    ? `Sent => speed:${data.speed}, temp:${data.temperature}°C, hum:${data.humidity}%, weather:${data.weather}, time:${data.timeOfDay} | Received => traffic:${result.trafficLevel}, pollution:${result.pollutionLevel}`
                    : `Error: ${result.error}`,
            };
            setLogs((prev) => [logEntry, ...prev].slice(0, 20));
        } catch (error) {
            console.error(error);
        }
    };

    const handleManualSend = () => {
        sendData(formData);
    };
    useEffect(() => {
        let interval;
        if (isSimulating) {
            interval = setInterval(() => {
                // Send the exact user‑entered values without randomizing temperature or humidity
                sendData(formData);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isSimulating, formData]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Controls Panel */}
                <div className="card">
                    <div className="flex items-center justify-between mb-8 border-b border-[#334155] pb-4">
                        <h2 className="text-xl font-semibold flex items-center text-[#F8FAFC]">
                            <Cpu className="mr-3 text-[#4F46E5]" /> Device Control
                        </h2>
                        <div
                            className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${isSimulating ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20' : 'bg-[#1E293B] text-[#94A3B8] border-[#334155]'
                                }`}
                        >
                            <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-[#22C55E] animate-pulse' : 'bg-[#94A3B8]'}`} />
                            <span>{isSimulating ? 'Active' : 'Standby'}</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Speed */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-[#94A3B8]">Vehicle Speed</label>
                                <span className="text-[#4F46E5] font-semibold">{formData.speed} km/h</span>
                            </div>
                            <input
                                type="range"
                                name="speed"
                                min="0"
                                max="120"
                                value={formData.speed}
                                onChange={handleChange}
                                className="w-full h-2 bg-[#1E293B] rounded-lg appearance-none cursor-pointer accent-[#4F46E5]"
                            />
                        </div>

                        {/* Temperature & Humidity */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#94A3B8]">Temperature (°C)</label>
                                <input
                                    type="number"
                                    name="temperature"
                                    value={formData.temperature}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#94A3B8]">Humidity (%)</label>
                                <input
                                    type="number"
                                    name="humidity"
                                    value={formData.humidity}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>
                        </div>

                        {/* Weather & Time */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#94A3B8]">Weather</label>
                                <select name="weather" value={formData.weather} onChange={handleChange} className="input-field">
                                    <option>Sunny</option>
                                    <option>Rainy</option>
                                    <option>Cloudy</option>
                                    <option>Snowy</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#94A3B8]">Time</label>
                                <select name="timeOfDay" value={formData.timeOfDay} onChange={handleChange} className="input-field">
                                    <option>Day</option>
                                    <option>Night</option>
                                    <option>Peak</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-6 flex gap-4">
                            <button onClick={handleManualSend} className="btn-primary flex-1 flex items-center justify-center">
                                <Send className="w-4 h-4 mr-2" /> Send Data
                            </button>
                            <button
                                onClick={() => setIsSimulating(!isSimulating)}
                                className={`flex-1 flex items-center justify-center rounded-xl font-semibold transition-all border ${isSimulating
                                    ? 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20 hover:bg-[#EF4444]/20'
                                    : 'bg-[#1E293B] text-[#F8FAFC] border-[#334155] hover:bg-[#334155]'
                                    }`}
                            >
                                {isSimulating ? (
                                    <>
                                        <Square className="w-4 h-4 mr-2 fill-current" /> Stop
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4 mr-2 fill-current" /> Auto
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Logs */}
                <div className="card flex flex-col h-[600px]">
                    <div className="flex items-center justify-between mb-4 border-b border-[#334155] pb-2">
                        <h2 className="text-lg font-semibold flex items-center text-[#F8FAFC]">
                            <Terminal className="mr-2 w-4 h-4 text-[#94A3B8]" /> System Logs
                        </h2>
                        <Wifi className={`w-4 h-4 ${isSimulating ? 'text-[#22C55E] animate-pulse' : 'text-[#94A3B8]'}`} />
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar font-mono text-sm">
                        {logs.length === 0 && (
                            <div className="text-[#94A3B8] mt-20 text-center">No activity recorded.</div>
                        )}
                        {logs.map((log) => (
                            <div key={log.id} className="flex items-start space-x-3 p-2 rounded hover:bg-[#334155]/30 transition-colors">
                                <span className="text-[#94A3B8] text-xs min-w-[60px]">{log.time}</span>
                                <span className={`text-xs font-bold ${log.status === 'OK' ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>{log.status}</span>
                                <span className="text-[#F8FAFC]">{log.details}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
