import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import IoTReading from '@/models/IoTReading';
import CityConfig from '@/models/CityConfig';
import { runPrediction } from '@/lib/predictionEngine';

export async function POST(request) {
    await dbConnect();

    try {
        const body = await request.json();
        const { speed, temperature, humidity, weather, timeOfDay } = body;

        // Validate required fields
        if (speed === undefined || temperature === undefined || humidity === undefined) {
            return NextResponse.json(
                { error: 'Missing required fields: speed, temperature, humidity' },
                { status: 400 }
            );
        }

        // Fetch city config for thresholds
        let config = await CityConfig.findOne();
        if (!config) {
            // Fallback if no config exists (shouldn't happen if seeded, but good for robustness)
            config = {
                thresholds: {
                    traffic: { highSpeed: 60, lowSpeed: 20 },
                    pollution: { highTemp: 30, highHumidity: 80 },
                },
            };
        }

        // Run prediction
        const predictions = runPrediction(
            { speed, temperature, humidity },
            config
        );

        // Create reading with predictions
        const reading = await IoTReading.create({
            speed,
            temperature,
            humidity,
            weather: weather || 'Sunny',
            timeOfDay: timeOfDay || 'Day',
            trafficLevel: predictions.trafficLevel,
            pollutionLevel: predictions.pollutionLevel,
        });

        return NextResponse.json(reading, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/iot:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
