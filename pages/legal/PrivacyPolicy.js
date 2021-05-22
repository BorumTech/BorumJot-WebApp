import Head from "next/head";
import Layout from "../../components/Layout/layout";
import BrandHeader from "../../components/BrandHeader/brandHeader";
import { getPrivacyPolicyContent } from "../../libs/legal";
import privacyPolicy from "./privacyPolicy.module.css";
import { useRouter } from "next/router";

export default function PrivacyPolicy(props) {
	const router = useRouter();

	const commonHead = (
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
	);

	if (router.query.showDocumentOnly) {
		return (
			<div className={privacyPolicy.documentOnlyContainer}>
				{commonHead}
				<Head>
					<link rel="icon" href="/images/favicon/favicon.ico" />
				</Head>
				{!!router.query.hideHeading ? "" : <h1>Borum Jot Privacy Policy</h1>}
				<article
					className={privacyPolicy.legalDocumentContent}
					dangerouslySetInnerHTML={{ __html: props.content }}
				/>
			</div>
		);
	}

	return (
		<Layout>
			{commonHead}

			<main>
				<BrandHeader />

				<div className={privacyPolicy.layoutFilledContainer}>
					<h1>Borum Jot Privacy Policy</h1>
					<article
						className={privacyPolicy.legalDocumentContent}
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
			content: await getPrivacyPolicyContent(),
		},
	};
}
