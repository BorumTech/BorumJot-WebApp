
export default function PinImage(props) {
	return (
		<img
            className={props.className ?? ""}
			height={25}
			width={25}
			src="/images/pin.png"
			alt="Pin icon"
			title="This jotting is pinned"
		/>
	);
}
