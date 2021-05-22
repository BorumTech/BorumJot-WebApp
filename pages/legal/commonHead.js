import Head from "next/head";

export default function CommonHead(props) {
    return (
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
}