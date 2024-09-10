import { Document, model, models, Schema } from 'mongoose';

interface ILenses extends Document {
	title: string;
	content: string;
	picture?: string;
	author: Schema.Types.ObjectId;
	topics: string[];
	published: boolean;
	createdAt?: Date;
	updatedAt?: Date;
	publishedOn?: Date;
}

const lensesSchema = new Schema<ILenses>(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		picture: { type: String, required: false },
		author: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
		topics: { type: [String], required: true },
		published: { type: Boolean, required: true },
		publishedOn: { type: Date, required: false },
	},
	{
		timestamps: true,
	}
);

export default models.Lenses || model<ILenses>('Lenses', lensesSchema);
