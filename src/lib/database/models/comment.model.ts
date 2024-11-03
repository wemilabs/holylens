import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IComment extends Document {
	content: string;
	author: mongoose.Types.ObjectId;
	article: mongoose.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
	{
		content: { type: String, required: true },
		author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		article: { type: Schema.Types.ObjectId, ref: 'Lens', required: true },
	},
	{ timestamps: true }
);

export default models.Comment || model<IComment>('Comment', CommentSchema);
