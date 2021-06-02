
const IconText = ({ iconClass, text, textBeforeIcon }) => {
    let className = `${iconClass}`;

    if (!className.startsWith('bi-'))
        className = `bi-${className}`

    if (textBeforeIcon) {
        return (
            <>
                {text} <i class={`bi ${className}`}></i>
            </>
        );
    }
    else {
        return (
            <>
                <i class={`bi ${className}`}></i> {text}
            </>
        );
    }
};

export default IconText;
