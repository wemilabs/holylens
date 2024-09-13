import User from '@/lib/database/models/user.model';
// import withDatabase from '@/lib/database/withDatabase';
import connectToDatabase from '@/lib/database/mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	await connectToDatabase();

	try {
		const { email, password } = await req.json();

		if (!email || !password)
			return NextResponse.json(
				{ message: 'Missing required fields' },
				{ status: 400 }
			);

		const user = await User.findOne({ email });
		if (!user)
			return NextResponse.json(
				{ message: 'Invalid credentials' },
				{ status: 400 }
			);

		const passwordValid = await bcrypt.compare(password, user.password);
		if (!passwordValid)
			return NextResponse.json(
				{ message: 'Invalid credentials' },
				{ status: 400 }
			);

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
			expiresIn: '1h',
		});

		return NextResponse.json(
			{
				token,
				user: {
					id: user._id,
					name: user.name,
					email: user.email,
					role: user.role,
				},
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Login error:', error);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
}

// export default withDatabase(handler);
