import jotting from "./jotting.module.css";
import Jotting from "../../libs/Jotting";
import { useRouter } from "next/router";
import Image from "next/image";

export default function NotePreview(props) {
	const router = useRouter();

	const handleNoteBtnClick = (e) => {
		Jotting.openJotting(router, "note", props);
	};

	return (
		<data className={jotting.jotting} value={"N" + props.id}>
			<button onClick={handleNoteBtnClick}>
				<span className={jotting.previewTitle}>{props.title}</span>
				{props.priority == 1 ? <Image
					height={32}
					width={32}
					src="/images/pin.png"
					alt="Pin icon"
					title="This jotting is pinned"
				/> : ""}
			</button>
		</data>
	);
}
