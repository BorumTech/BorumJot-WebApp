export default function Note(props) {
    return (
        <data value={"note-"+props.id}>
            {props.title}
        </data>
    );
}