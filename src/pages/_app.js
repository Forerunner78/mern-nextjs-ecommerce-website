import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import { StoreProvider } from "@/utils/Store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider, useSession } from "next-auth/react";
import { Roboto } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "../../dist/output.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export default function App({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<>
			<main className={roboto.className}>
				<Head>
					<title>Alex&apos;s Shop</title>
					<meta name="description" content="Ecommerce website built with MERN" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<SessionProvider session={session}>
					<StoreProvider>
						<PayPalScriptProvider deferLoading={true}>
							<ToastContainer limit={1} />
							<main className="w-full min-h-screen">
								<Header />
								<main className="w-full min-h-screen">
									{Component.auth ? (
										<Auth>
											<Component {...pageProps} />
										</Auth>
									) : (
										<>
											<Component {...pageProps} />
										</>
									)}
								</main>
								<Footer />
							</main>
						</PayPalScriptProvider>
					</StoreProvider>
				</SessionProvider>
			</main>
		</>
	);
}

function Auth({ children }) {
	const router = useRouter();
	const { status } = useSession({
		required: true,
		onUnauthenticated() {
			router.push("/unauthorized?message=Login required");
		},
	});
	if (status === "loading") {
		return <div>Loading...</div>;
	}
	return children;
}
