export default function FormField({autofocus=false, label, format="text",required=false}) {
    return (
        <fieldset>
            <legend><label htmlFor={label}>{label[0].toUpperCase() + label.substring(1).toLowerCase()}</label></legend>
            <input required={required} autoFocus={autofocus} type={format} id={label} name={label} />
        </fieldset>
    );
}