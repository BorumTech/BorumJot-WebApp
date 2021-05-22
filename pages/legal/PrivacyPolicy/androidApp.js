import CommonHead from "../commonHead";
import Head from "next/head";
import { getPrivacyPolicyContent } from "../../../libs/legal";

export default function AndroidApp(props) {
	return (
		<div style={{padding: "1em"}}>
			<CommonHead />
			<Head>
				<link rel="icon" href="/images/favicon/favicon.ico" />
			</Head>

			<article
				dangerouslySetInnerHTML={{ __html: props.content }}
			/>
		</div>
	);
}

export async function getStaticProps() {
	return {
		props: {
			content: await getPrivacyPolicyContent(),
		},
	};
}

