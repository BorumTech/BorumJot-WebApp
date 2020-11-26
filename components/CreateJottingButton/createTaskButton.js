import createJottingBtn from "./createJottingBtn.module.css";
import CreateJottingButton from "./createJottingButton";

export default function CreateTaskButton(props) {
	return <CreateJottingButton jotType="Task" {...props} />
}