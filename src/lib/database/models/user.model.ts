import { Document, model, models, Schema, Types } from 'mongoose';

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: 'reader' | 'author';
	bio?: string;
	avatar?: string;
	articlesWritten: Types.ObjectId[];
	readingList: Types.ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minLenght: [2, 'Name must be at least 2 characters long'],
			maxLenght: [50, 'Name must be no longer than 50 characters long'],
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
		},
		password: {
			type: String,
			required: true,
			minlength: [9, 'Password must be at least 9 characters long'],
			maxlength: [128, 'Password cannot exceed 128 characters'],
		},
		role: { type: String, enum: ['reader', 'author'], default: 'reader' },
		bio: {
			type: String,
			maxlength: [500, 'Bio cannot exceed 500 characters'],
		},
		avatar: {
			type: String,
			validate: {
				validator: function (v: string) {
					return /^(https?:\/\/)?.+\.(jpg|jpeg|png|gif)$/i.test(v);
				},
				message: 'Avatar must be a valid image URL',
			},
		},
		articlesWritten: [{ type: Schema.Types.ObjectId, ref: 'Lens' }],
		readingList: [{ type: Schema.Types.ObjectId, ref: 'Lens' }],
	},
	{ timestamps: true }
);

export default models.User || model<IUser>('User', UserSchema);
