export default function InputField({ label, name, type, onChange }) {
    return (
        <div className="input_group">
            <input
                type={type}
                id={name}
                name={name}
                className="input_field"
                placeholder={label}
                onChange={onChange}
            />
            <label htmlFor={name} className="input_label">
                {label}
            </label>
        </div>
    );
}
