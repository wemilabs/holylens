import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IComment extends Document {
	content: string;
	author: mongoose.Types.ObjectId;
	article: mongoose.Types.ObjectId;
	likes?: mongoose.Types.ObjectId[];
	replies?: any[]; //IComment[]
	createdAt: Date;
	updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
	{
		content: { type: String, required: true },
		author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		article: { type: Schema.Types.ObjectId, ref: 'Lens', required: true },
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		replies: [
			{
				content: { type: String, required: true },
				author: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				createdAt: { type: Date, default: Date.now },
				// type: mongoose.Schema.Types.ObjectId,
				// ref: 'Comment',
			},
		],
	},
	{ timestamps: true }
);

export default models.Comment || model<IComment>('Comment', CommentSchema);
