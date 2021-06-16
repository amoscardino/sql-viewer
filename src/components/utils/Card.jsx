import IconText from "./IconText";

const Card = ({ iconClass, title, useCardBody, headerBg, children }) => (
    <div className="card mb-4 shadow-sm">
        <div className={`card-header ${headerBg || 'bg-primary'} bg-gradient text-light fw-bold`}>
            <IconText iconClass={iconClass} text={title} />
        </div>

        {useCardBody && (
            <div className="card-body">
                {children}
            </div>
        )}

        {!useCardBody && children}
    </div>
);

export default Card;