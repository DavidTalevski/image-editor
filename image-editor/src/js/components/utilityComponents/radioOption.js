
const RadioOption = ({ label, value, checked, onChange }) => (
    <label className="radio-option">
        <div>
            <input
                type="radio"
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <span></span>
        </div>
        <div className="label-text">{label}</div>
    </label>
);


export default RadioOption;