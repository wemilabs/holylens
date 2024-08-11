import { Document, model, Schema } from 'mongoose';

export interface Articles extends Document {
	title: string;
	content: string;
	author: object;
	createdAt?: Date;
	updatedAt?: Date;
}

const articlesSchema = new Schema<Articles>(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		author: { ref: 'Users', required: true },
	},
	{
		timestamps: true,
	}
);

export default model<Articles>('Articles', articlesSchema);
