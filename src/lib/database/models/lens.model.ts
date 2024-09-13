import { Document, model, models, Schema, Types } from 'mongoose';

export interface ILens extends Document {
	title: string;
	content: string;
	author: Types.ObjectId;
	tags: string[];
	publishedDate: Date;
	createdAt: Date;
	updatedAt: Date;
}

const LensSchema: Schema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: [3, 'Title must be at least 3 characters long'],
			maxlength: [100, 'Title cannot exceed 100 characters'],
		},
		content: {
			type: String,
			required: true,
			minlength: [10, 'Content must be at least 10 characters long'],
		},
		author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		tags: [
			{
				type: String,
				trim: true,
				lowercase: true,
				validate: {
					validator: function (v: string) {
						return v.length >= 2 && v.length <= 20;
					},
					message: 'Each tag must be between 2 and 20 characters long',
				},
			},
		],
		publishedDate: {
			type: Date,
			validate: {
				validator: function (v: Date) {
					return v <= new Date();
				},
				message: 'Published date cannot be in the future',
			},
		},
	},
	{ timestamps: true }
);

export default models.Lens || model<ILens>('Lens', LensSchema);
