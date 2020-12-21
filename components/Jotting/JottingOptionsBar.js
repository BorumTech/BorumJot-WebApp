import jotting from "./jotting.module.css";
import Image from "next/image";
import { pinJotting, deleteJotting } from "../../libs/Datastore/requests";

export default function JottingOptionsBar(props) {
	const handleDeleteClick = async (e) => {
		try {
			await deleteJotting(props)
		} catch {
			// TODO: Display unable to be deleted due to a system error as custom status alert
		}
	};

	const handlePinClick = async (e) => {
		await pinJotting(props);
		if (props.setPriority) props.setPriority(props.priority);
	};

	return (
		<div className={jotting.jottingOptionsBar}>
			<button onClick={handleDeleteClick}>
				<Image height={32} width={32} src="/images/trash.png" />
			</button>
			<button onClick={handlePinClick}>
				<Image height={32} width={32} src="/images/pin.png" />
			</button>
		</div>
	);
}
