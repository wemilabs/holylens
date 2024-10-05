import { NextRequest, NextResponse } from 'next/server';
import { getLenses } from '@/lib/actions/lens.actions';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const page = parseInt(searchParams.get('page') || '1', 10);
	const limit = parseInt(searchParams.get('limit') || '10', 10);

	try {
		const lenses = await getLenses(page, limit);
		return NextResponse.json(lenses);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch lenses' },
			{ status: 500 }
		);
	}
}
