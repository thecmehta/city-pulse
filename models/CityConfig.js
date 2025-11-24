import mongoose from 'mongoose';

const CityConfigSchema = new mongoose.Schema({
    cityName: {
        type: String,
        required: true,
        default: 'Metropolis',
    },
    population: {
        type: Number,
        default: 1000000,
    },
    vehicleCount: {
        type: Number,
        default: 50000,
    },
    zones: {
        type: [String],
        default: ['Downtown', 'Industrial', 'Residential', 'Park'],
    },
    // Thresholds for logic (can be adjusted in settings)
    thresholds: {
        traffic: {
            highSpeed: { type: Number, default: 60 }, // Above this is Low traffic
            lowSpeed: { type: Number, default: 20 },  // Below this is High traffic
        },
        pollution: {
            highTemp: { type: Number, default: 30 },
            highHumidity: { type: Number, default: 80 },
        },
    },
}, { timestamps: true });

// Prevent recompilation of model in development
export default mongoose.models.CityConfig || mongoose.model('CityConfig', CityConfigSchema);
