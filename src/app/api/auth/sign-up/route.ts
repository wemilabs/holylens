import User from '@/lib/database/models/user.model';
// import withDatabase from '@/lib/database/withDatabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/database/mongoose';

export async function POST(req: Request) {
	await connectToDatabase();

	try {
		const { name, email, password } = await req.json();

		if (!name || !email || !password)
			return NextResponse.json(
				{
					message: 'Missing required fields',
				},
				{ status: 400 }
			);

		const existingUser = await User.findOne({ email });
		if (existingUser)
			return NextResponse.json(
				{ message: 'User already exists' },
				{ status: 400 }
			);

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, {
			expiresIn: '1h',
		});

		return NextResponse.json(
			{
				token,
				user: {
					id: newUser._id,
					name: newUser.name,
					email: newUser.email,
					role: newUser.role,
				},
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('Registration error:', error);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
}

// export default withDatabase(handler);
