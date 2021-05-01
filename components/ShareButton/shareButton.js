import Image from "next/image";

/**
 * A share button
 * @returns
 */
export default function ShareButton({
	showShareMenuState: [showShareMenu, setShowShareMenu],
}) {
	const handleShareClick = (e) => {
		setShowShareMenu(!showShareMenu);
	};

	return (
		<button onClick={handleShareClick}>
			<Image
				height={35}
				width={55}
				src="/images/share.png"
				alt="share icon"
				title="Share jotting"
			/>
		</button>
	);
}
