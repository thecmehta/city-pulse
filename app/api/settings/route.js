import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CityConfig from '@/models/CityConfig';

export const dynamic = 'force-dynamic';

export async function GET() {
    await dbConnect();
    try {
        const config = await CityConfig.findOne();
        return NextResponse.json(config || {});
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
    await dbConnect();
    try {
        const body = await request.json();

        // Update the existing config or create new one
        // We assume only one config document exists for the city
        const config = await CityConfig.findOneAndUpdate({}, body, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        });

        return NextResponse.json(config);
    } catch (error) {
        console.error('Error in POST /api/settings:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
