import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import IoTReading from '@/models/IoTReading';

export const dynamic = 'force-dynamic'; // Ensure no caching for real-time data

export async function GET() {
    await dbConnect();

    try {
        // Fetch latest reading
        const latest = await IoTReading.findOne().sort({ createdAt: -1 }).lean();

        // Fetch history for charts (last 20 readings)
        const history = await IoTReading.find().sort({ createdAt: -1 }).limit(20).lean();

        // Reverse history to be chronological (oldest -> newest) for charts
        const chartData = history.reverse();

        return NextResponse.json({
            latest,
            history: chartData,
        });
    } catch (error) {
        console.error('Error in GET /api/prediction:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
