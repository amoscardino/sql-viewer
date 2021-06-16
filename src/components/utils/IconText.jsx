
const IconText = ({ iconClass, text, textBeforeIcon }) => {
    let className = `${iconClass}`;

    if (!className.startsWith('bi-'))
        className = `bi-${className}`

    if (textBeforeIcon) {
        return (
            <>
                {text} <i class={`bi ${className} ms-1`}></i>
            </>
        );
    }

    return (
        <>
            <i class={`bi ${className} me-1`}></i> {text}
        </>
    );
};

export default IconText;
