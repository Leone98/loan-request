import {StyledInput} from "./styles.js";

function Input({ inputId, inputValue, onInputChange, inputPlaceholder, error }) {

    return (
        <StyledInput
            id={inputId}
            value={inputValue}
            onChange={onInputChange}
            hasError={!!error}
            className="border border-gray-300 py-2 px-5 rounded-3xl mx-3 w-60"
            placeholder={inputPlaceholder}
        />
    )
}

export default Input;