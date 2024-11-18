import mongoose, { Document, model, models, Schema } from 'mongoose';

export interface ILens extends Document {
	title: string;
	description: string;
	coverImage_url?: string;
	content: string;
	slug: string;
	author: mongoose.Types.ObjectId;
	tags: string[];
	comments: mongoose.Types.ObjectId[];
	isPublished: boolean;
	publishedDate: Date;
	readTime?: string;
	likes_count?: number;
	comments_count?: number;
	favorites_count?: number;
	views_count?: number;
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
		description: {
			type: String,
			maxlength: [500, 'Description cannot exceed 500 characters'],
		},
		coverImage_url: {
			type: String,
			validate: {
				validator: function (v: string) {
					return /^(https?:\/\/)?.+(\.(jpg|jpeg|png|gif))?$/i.test(v);
				},

				message: 'Image URL must be a valid image URL',
			},
		},
		content: { type: String, required: true },
		slug: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			validate: {
				validator: function (v: string) {
					return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v);
				},
				message: 'Slug must be a valid URL slug',
			},
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
		comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
		comments_count: {
			type: Number,
			value: function (this: ILens) {
				return this.comments.length;
			},
			default: 0,
		},
		likes_count: { type: Number, default: 0 },
		favorites_count: { type: Number, default: 0 },
		views_count: { type: Number, default: 0 },
		isPublished: { type: Boolean, default: false },
		publishedDate: {
			type: Date,
			validate: {
				validator: function (v: Date) {
					return v <= new Date();
				},
				message: 'Published date cannot be in the future',
			},
			required: function (this: ILens) {
				return this.isPublished;
			},
		},
		readTime: { type: String, default: '2 min read' },
	},
	{ timestamps: true }
);

export default models.Lens || model<ILens>('Lens', LensSchema);
