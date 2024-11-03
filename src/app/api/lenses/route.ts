import { NextRequest, NextResponse } from 'next/server';
import { getLenses } from '@/lib/actions/lens.actions';
// import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
	// const token = request.headers.get('Authorization')?.split(' ')[1];
	// if (!token || !verifyToken(token)) {
	// 	return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	// }

	const searchParams = request.nextUrl.searchParams;
	const page = parseInt(searchParams.get('page') || '1', 10);
	const limit = parseInt(searchParams.get('limit') || '10', 10);
	const categories = searchParams.get('categories')?.split(',') || [];

	try {
		const lenses = await getLenses(categories, page, limit);
		return NextResponse.json(lenses);
	} catch (error) {
		console.error('Error fetching lenses:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch lenses' },
			{ status: 500 }
		);
	}
}
