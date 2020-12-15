import settings from "./settings.module.css";
import Layout from "../../components/Layout/layout";
import Head from "next/head";
import BrandHeader from "../../components/BrandHeader/brandHeader";

export default function Settings(props) {
	return (
		<Layout>
			<Head>
				<title>Settings - Borum Jot</title>
			</Head>

			<main className={settings.main}>
				<BrandHeader />

				<section>
					<button>Export Data</button>
					
					{/* <button>Change Color Theme</button> */}

					<p>
						To update your Borum Account, go to{" "}
						<a href="https://accounts.bforborum.com">
							accounts.bforborum.com
						</a>
					</p>
				</section>
			</main>
		</Layout>
	);
}
