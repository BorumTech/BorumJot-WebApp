import Head from "next/head";
import Layout from "../../components/Layout/layout";
import BrandHeader from "../../components/BrandHeader/brandHeader";
import { getPrivacyPolicyContent } from "../../libs/legal";
import privacyPolicy from "./privacyPolicy.module.css";
import { useRouter } from "next/router";
import CommonHead from "./commonHead";

export default function PrivacyPolicy(props) {
	const router = useRouter();

	if (router.query.showDocumentOnly) {
		return (
			<div className={privacyPolicy.documentOnlyContainer}>
				<CommonHead />
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
			<CommonHead />

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
