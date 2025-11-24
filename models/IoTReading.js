import mongoose from 'mongoose';

const IoTReadingSchema = new mongoose.Schema({
    speed: {
        type: Number,
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    humidity: {
        type: Number,
        required: true,
    },
    weather: {
        type: String, // e.g., 'Sunny', 'Rainy', 'Cloudy'
        required: true,
    },
    timeOfDay: {
        type: String, // 'Peak', 'Day', 'Night'
        required: true,
    },
    // Calculated predictions
    trafficLevel: {
        type: String, // 'Low', 'Medium', 'High'
    },
    pollutionLevel: {
        type: String, // 'Low', 'Medium', 'High'
    },
}, { timestamps: true });

export default mongoose.models.IoTReading || mongoose.model('IoTReading', IoTReadingSchema);
