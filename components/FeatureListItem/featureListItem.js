import featureListItem from "./featureListItem.module.css";
import Image from "next/image";

export default function FeatureListItem({
	heading,
	description,
	imgSrc,
	imgWidth = 32,
	imgHeight = 32,
}) {
	return (
		<li className={featureListItem.featureListItem}>
			<div className={featureListItem.firstRow}>
				<Image layout="fixed" src={imgSrc} height={imgWidth} width={imgHeight} />
				<h3>{heading}</h3>
			</div>
			<p>{description}</p>
		</li>
	);
}
