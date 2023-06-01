import Order from "@/models/orderModel";
import db from "@/utils/db";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
	const user = await getToken({ req });
	if (!user) {
		return res.status(401).send("signIn required");
	}
	await db.connect();
	const newOrder = new Order({ ...req.body, user: user._id });

	const order = await newOrder.save();
	await db.disconnect();
	res.status(201).send(order);
};

export default handler;
