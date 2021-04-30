import Head from "next/head";
import Layout from "../../components/Layout/layout";
import BrandHeader from "../../components/BrandHeader/brandHeader";
import { getPrivacyPolicyContent } from "../../libs/legal";
import privacyPolicy from "./privacyPolicy.module.css";

export default function PrivacyPolicy(props) {
	return (
		<Layout>
			<Head>
				<link
					href="https://cdn.jsdelivr.net/gh/Borumer/Flytrap@1cca457/css/sub.css"
					rel="stylesheet"
					type="text/css"
				/>
				<link
					href="https://cdn.jsdelivr.net/gh/Borumer/Flytrap@1cca457/legal/legal.css"
					rel="stylesheet"
					type="text/css"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap"
					rel="stylesheet"
				/>
				<title>Borum Jot Privacy Policy</title>
			</Head>

			<main>
				<BrandHeader />

				<div className={privacyPolicy.grid}>
					<h1>Privacy Policy</h1>
					<article
						className="legal-document-content"
						dangerouslySetInnerHTML={{ __html: props.content }}
					/>
				</div>
			</main>
		</Layout>
	);
}

export async function getStaticProps() {
	return {
		props: {
			content: getPrivacyPolicyContent(),
		},
	};
}
