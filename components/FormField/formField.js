export default function FormField({autofocus="false", label, format="text"}) {
    return (
        <fieldset>
            <legend><label for={label}>{label[0].toUpperCase() + label.substring(1).toLowerCase()}</label></legend>
            <input autofocus={autofocus} type={format} id={label} name={label} />
        </fieldset>
    );
}