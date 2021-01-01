import jotting from "./jotting.module.css";
import Image from "next/image";
import { pinJotting, deleteJotting } from "../../libs/Datastore/requests";
import Jotting from "../../libs/Jotting";
import { useRouter } from "next/router";

export default function JottingOptionsBar(props) {
	const router = useRouter();

	const handleDeleteClick = async (e) => {
		try {
			await deleteJotting(props);
			Jotting.closeJotting(router);
		} catch {
			alert("The note was not deleted due to a system error");
		}
	};

	const handlePinClick = async (e) => {
		try {
			await pinJotting({
				id: props.id,
				jotType: props.jotType,
				priority: props.priority
			});
			if (props.setPriority) props.setPriority(props.priority);
		} catch {
			alert("The jotting could not be pinned due to a system error");
		}
	};

	return (
		<div className={jotting.jottingOptionsBar}>
			<button onClick={handleDeleteClick}>
				<Image
					height={32}
					width={32}
					src="/images/trash.png"
					alt="Delete icon"
					title="Delete jotting"
				/>
			</button>
			<button onClick={handlePinClick}>
				<Image
					height={32}
					width={32}
					src="/images/pin.png"
					alt="Pin icon"
					title="Pin jotting"
				/>
			</button>
			{props.children}
		</div>
	);
}
