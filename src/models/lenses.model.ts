import { Document, model, models, Schema } from 'mongoose';

export interface ILenses extends Document {
	title: string;
	content: string;
	author: Schema.Types.ObjectId;
	createdAt?: Date;
	updatedAt?: Date;
}

const lensesSchema = new Schema<ILenses>(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		author: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
	},
	{
		timestamps: true,
	}
);

export default models.Lenses || model<ILenses>('Lenses', lensesSchema);
