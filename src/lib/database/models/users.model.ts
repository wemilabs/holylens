import { Document, model, models, Schema } from 'mongoose';

interface IUsers extends Document {
	name: string;
	email: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const usersSchema = new Schema<IUsers>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default models.Users || model<IUsers>('Users', usersSchema);
