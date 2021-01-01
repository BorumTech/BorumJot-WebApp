import Image from "next/image";

export default function PinImage(props) {
	return (
		<Image
            className={props.className ?? ""}
			height={25}
			width={25}
			src="/images/pin.png"
			alt="Pin icon"
			title="This jotting is pinned"
		/>
	);
}
