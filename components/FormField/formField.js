import formField from "./formField.module.css";

export default function FormField({
  autofocus = false,
  label,
  format = "text",
  required = false,
  value = "",
  onChange = () => {},
}) {
  return (
    <fieldset>
      <legend>
        <label htmlFor={label}>
          {label[0].toUpperCase() + label.substring(1).toLowerCase()}
        </label>
      </legend>
      <input
        className={formField.field}
        required={required}
        autoFocus={autofocus}
        type={format}
        id={label}
        name={label}
        value={value}
        onChange={onChange}
      />
    </fieldset>
  );
}
