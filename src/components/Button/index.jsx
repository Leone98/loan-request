import {StyledButton} from "./styles.js";

function Button({ buttonType, isLarge, isMedium, onClick, children }) {
    const largeClass = isLarge ? ' w-60' : isMedium ? ' w-40' : '';
    const classes = "py-2 px-5 bg-blue-950 text-white rounded-3xl mx-3" + largeClass;

    return (
        <StyledButton
            type={buttonType}
            className={classes}
            onClick={onClick}
        >{children}</StyledButton>
    )
}

export default Button;