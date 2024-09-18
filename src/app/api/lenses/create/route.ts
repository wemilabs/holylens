import Lens from '@/lib/database/models/lens.model';
import User from '@/lib/database/models/user.model';
import connectToDatabase from '@/lib/database/mongoose';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	await connectToDatabase();

	try {
		const token = request.headers.get('Authorization')?.split(' ')[1];

		if (!token)
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
			userId: string;
		};

		if (!decoded)
			return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

		const body = await request.json();
		const {
			title,
			slug,
			description,
			content,
			tags,
			isPublished,
			publishedDate,
		} = body;

		const newLens = new Lens({
			title,
			slug,
			description,
			content,
			author: decoded.userId,
			tags,
			isPublished,
			publishedDate: isPublished ? publishedDate : undefined,
		});

		const savedLens = await newLens.save();

		// Update the user's articlesWritten array
		await User.findByIdAndUpdate(
			decoded.userId,
			{ $push: { articlesWritten: savedLens._id } },
			{ new: true }
		);

		return NextResponse.json(newLens, { status: 201 });
	} catch (error) {
		console.error('Error creating lens:', error);
		return NextResponse.json(
			{ error: 'Failed to create lens' },
			{ status: 500 }
		);
	}
}
