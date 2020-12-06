import jotting from "./jotting.module.css";
import Image from "next/image";

export default function JottingOptionsBar(props) {
	const handleDeleteClick = (e) => {
		fetch(`https://api.jot.bforborum.com/api/v1/${props.jotType}`, {
			headers: {
				authorization: "Basic " + localStorage.getItem("userApiKey"),
			},
			body: `id=${props.id}`,
			method: "DELETE",
		}).catch((response) => {
			// TODO: Display unable to be deleted due to a system error as custom status alert
		});
	};

	const handlePinClick = (e) => {
		const queryString = `id=${props.id}&priority=${
			props.priority == 0 ? 1 : 0
		}`;
		fetch(
			`https://api.jot.bforborum.com/api/v1/${props.jotType}?${queryString}`,
			{
				headers: {
					authorization:
						"Basic " + localStorage.getItem("userApiKey"),
					"content-type": "application/x-www-form-urlencoded",
				},
				method: "PUT",
			}
		).then((response) => {
			if (props.setPriority) props.setPriority(props.priority);
		});
	};

	const handleRenameClick = (e) => {};

	return (
		<div className={jotting.jottingOptionsBar}>
			<button onClick={handleDeleteClick}>
				<Image height={32} width={32} src="/images/trash.png" />
			</button>
			<button onClick={handlePinClick}>
				<Image height={32} width={32} src="/images/pin.png" />
			</button>
			<button onClick={handleRenameClick}>Rename</button>
		</div>
	);
}
