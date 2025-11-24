/**
 * Prediction Engine
 * Classifies Traffic and Pollution levels based on sensor data and city configuration.
 */

export function predictTraffic(speed, thresholds) {
    if (speed >= thresholds.highSpeed) {
        return 'Low';
    } else if (speed <= thresholds.lowSpeed) {
        return 'High';
    } else {
        return 'Medium';
    }
}

export function predictPollution(temperature, humidity, thresholds) {
    // Simple rule: High temp or high humidity contributes to pollution risk
    // In a real model, this would be more complex (e.g., AQI calculation)

    let score = 0;

    if (temperature > thresholds.highTemp) score += 1;
    if (humidity > thresholds.highHumidity) score += 1;

    if (score >= 2) return 'High';
    if (score === 1) return 'Medium';
    return 'Low';
}

export function runPrediction(reading, config) {
    const trafficLevel = predictTraffic(reading.speed, config.thresholds.traffic);
    const pollutionLevel = predictPollution(reading.temperature, reading.humidity, config.thresholds.pollution);

    return {
        trafficLevel,
        pollutionLevel,
    };
}
