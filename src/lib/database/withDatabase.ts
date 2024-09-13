import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from './mongoose';

const withDatabase =
	(handler: NextApiHandler) =>
	async (req: NextApiRequest, res: NextApiResponse) => {
		await connectToDatabase();
		return handler(req, res);
	};

export default withDatabase;
