import brandHeader from "./brandHeader.module.css";
import LogoImage from "../logoImage";
import Link from "next/link";

export default function BrandHeader(props) {
	return (
		<header className={brandHeader.brandNameContainer}>
			<Link href="/">
				<a>
					<LogoImage />
					<span>Borum Jot</span>
				</a>
			</Link>
		</header>
	);
}
