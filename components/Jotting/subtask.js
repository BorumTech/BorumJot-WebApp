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

    // Use 'T' prefix to prevent from using cache for subtasks list (ST) and because a task with a unique id is getting fetched
    const { data, error } = useSWR("T" + id, id => getTask(id.substring(1)).makeRequest());

    if (!data) return <ProgressSpinner /> ;
    if (error) return <FetchError itemName="task" />

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