import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CityConfig from '@/models/CityConfig';

export async function GET() {
    await dbConnect();

    try {
        // Check if config exists
        const existingConfig = await CityConfig.findOne();
        if (existingConfig) {
            return NextResponse.json({ message: 'City config already exists', config: existingConfig });
        }

        // Create default config
        const defaultConfig = await CityConfig.create({
            cityName: 'Metropolis',
            population: 1000000,
            vehicleCount: 50000,
            zones: ['Downtown', 'Industrial', 'Residential', 'Park'],
            thresholds: {
                traffic: { highSpeed: 60, lowSpeed: 20 },
                pollution: { highTemp: 30, highHumidity: 80 },
            },
        });

        return NextResponse.json({ message: 'City config created', config: defaultConfig });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
