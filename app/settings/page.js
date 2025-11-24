'use client';

import { useState, useEffect } from 'react';
import { Save, Settings as SettingsIcon, AlertCircle, Sliders, Database } from 'lucide-react';

export default function Settings() {
    const [config, setConfig] = useState({
        population: 0,
        vehicleCount: 0,
        thresholds: {
            traffic: { highSpeed: 0, lowSpeed: 0 },
            pollution: { highTemp: 0, highHumidity: 0 }
        }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                setConfig(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    const updateConfig = (path, value) => {
        const keys = path.split('.');
        setConfig(prev => {
            const newState = { ...prev };
            let current = newState;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = Number(value);
            return newState;
        });
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config),
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Configuration saved successfully.' });
            } else {
                setMessage({ type: 'error', text: 'Failed to save configuration.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Connection error.' });
        }
        setSaving(false);
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-[#4F46E5] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="card">
                <div className="flex items-center mb-8 border-b border-[#334155] pb-6">
                    <div className="p-3 bg-[#4F46E5]/10 rounded-xl mr-4">
                        <SettingsIcon className="w-6 h-6 text-[#4F46E5]" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-[#F8FAFC]">Settings</h1>
                        <p className="text-[#94A3B8]">Manage system parameters</p>
                    </div>
                </div>

                {message && (
                    <div className={`p-4 rounded-xl mb-8 flex items-center ${message.type === 'success' ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20' : 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20'}`}>
                        <AlertCircle className="w-5 h-5 mr-3" />
                        {message.text}
                    </div>
                )}

                <div className="space-y-10">
                    {/* City Metadata */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-[#F8FAFC] flex items-center">
                            <Database className="w-5 h-5 mr-2 text-[#94A3B8]" />
                            City Metadata
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-[#94A3B8] mb-2">Population</label>
                                <input
                                    type="number"
                                    value={config.population}
                                    onChange={(e) => updateConfig('population', e.target.value)}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#94A3B8] mb-2">Registered Vehicles</label>
                                <input
                                    type="number"
                                    value={config.vehicleCount}
                                    onChange={(e) => updateConfig('vehicleCount', e.target.value)}
                                    className="input-field"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Thresholds */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-[#F8FAFC] flex items-center">
                            <Sliders className="w-5 h-5 mr-2 text-[#94A3B8]" />
                            Prediction Thresholds
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-6 rounded-2xl bg-[#0F172A]/50 border border-[#334155] space-y-4">
                                <h4 className="font-semibold text-[#4F46E5] text-sm uppercase tracking-wider">Traffic Logic</h4>
                                <div>
                                    <label className="block text-sm font-medium text-[#94A3B8] mb-1">High Speed Threshold (km/h)</label>
                                    <p className="text-xs text-[#64748B] mb-2">Speeds above this = LOW traffic</p>
                                    <input
                                        type="number"
                                        value={config.thresholds.traffic.highSpeed}
                                        onChange={(e) => updateConfig('thresholds.traffic.highSpeed', e.target.value)}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#94A3B8] mb-1">Low Speed Threshold (km/h)</label>
                                    <p className="text-xs text-[#64748B] mb-2">Speeds below this = HIGH traffic</p>
                                    <input
                                        type="number"
                                        value={config.thresholds.traffic.lowSpeed}
                                        onChange={(e) => updateConfig('thresholds.traffic.lowSpeed', e.target.value)}
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-[#0F172A]/50 border border-[#334155] space-y-4">
                                <h4 className="font-semibold text-[#EF4444] text-sm uppercase tracking-wider">Pollution Logic</h4>
                                <div>
                                    <label className="block text-sm font-medium text-[#94A3B8] mb-1">High Temp Threshold (°C)</label>
                                    <input
                                        type="number"
                                        value={config.thresholds.pollution.highTemp}
                                        onChange={(e) => updateConfig('thresholds.pollution.highTemp', e.target.value)}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#94A3B8] mb-1">High Humidity Threshold (%)</label>
                                    <input
                                        type="number"
                                        value={config.thresholds.pollution.highHumidity}
                                        onChange={(e) => updateConfig('thresholds.pollution.highHumidity', e.target.value)}
                                        className="input-field"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="w-5 h-5 mr-2" />
                            {saving ? 'Saving...' : 'Save Configuration'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
