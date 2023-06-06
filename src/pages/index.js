import ProductItem from "@/components/ProductItem";
import Product from "@/models/productModel";
import db from "@/utils/db";

export default function Home({ products }) {
	return (
		<div className="grid gap-4 grid-cols-2">
			{products.map((product) => (
				<ProductItem product={product} key={product.id} />
			))}
		</div>
	);
}

export async function getServerSideProps() {
	await db.connect();
	const products = await Product.find().lean();
	return { props: { products: products.map(db.convertDocToObj) } };
}
