import settings from "./settings.module.css";
import Layout from "../../components/Layout/layout";
import Head from "next/head";
import BrandHeader from "../../components/BrandHeader/brandHeader";
import {
	getJottingsRaw,
	getSharedJottings,
} from "../../libs/Datastore/requests";
import Browser from "../../libs/browser";

export default function Settings(props) {
	/**
	 * Loops through all data and then puts it all in one array
	 * @param {Event} e
	 */
	const handleExportDataClick = (e) => {
		Promise.all([getJottingsRaw(), getSharedJottings()]).then((values) => {
			let downloadData = [].concat(values[0].data, values[1].data);

			const jsonData = JSON.stringify(downloadData);
			const blobData = new Blob([jsonData], {
				type: "text/plain;charset=utf-8",
			});

			const FILE_NAME = "userjottings.txt";
			if (new Browser(window).isIE) {
				window.navigator.msSaveBlob(blobData, FILE_NAME);
			} else {
				const url = window.URL || window.webkitURL;
				const link = url.createObjectURL(blobData);
				const a = document.createElement("a");
				a.download = FILE_NAME;
				a.href = link;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			}
		});
	};

	return (
		<Layout>
			<Head>
				<title>Settings - Borum Jot</title>
			</Head>
	
			<main className={settings.main}>
				<BrandHeader />
				<section className={settings.mainSection}>
					<button
						className={settings.exportData}
						onClick={handleExportDataClick}
					>
						Export Data
					</button>

					{/* <button>Change Color Theme</button> */}

					<p>
						To update your Borum Account, go to{" "}
						<a href="https://accounts.borumtech.com">
							accounts.borumtech.com
						</a>
					</p>
				</section>
			</main>
		</Layout>
	);
}
