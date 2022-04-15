import useSWR from "swr";
import { getTask } from "../../libs/Datastore/requests";
import FetchError from "../FetchError/fetchError";
import ProgressSpinner from "../ProgressSpinner/progressSpinner";
import StyledCheckbox from "../StyledCheckbox/styledCheckbox";
import Jotting from "./jotting";
import JottingDetails from "./jottingDetails";
import JottingOptionsBar from "./JottingOptionsBar";
import SubtasksControl from "./subtasksControl";

export default function Subtask({ id }) {

    const { data, error } = useSWR(id, id => getTask(id).makeRequest());

    if (!data) return <ProgressSpinner /> ;
    if (error) return <FetchError itemName="task" />

    console.debug("Subtask: ", data.data);

    return (
        <Jotting jotType="task" {...data.data}>
            <JottingOptionsBar jotType="task" {...data.data}>
                <div>
                    <StyledCheckbox
                        id={data.data.id}
                        prefix="task-completion-box-"
                        completed={data.data.completed == 1}
                    />
                </div>
            </JottingOptionsBar>
            <JottingDetails jotType="task" jottingInfo={data.data} />
            <SubtasksControl task={data.data} />
        </Jotting>
    );
}