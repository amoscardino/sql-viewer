
const Card = ({ title, useCardBody, headerBg, children }) => (
    <div className="card mb-4 shadow-sm">
        <div className={`card-header ${headerBg || 'bg-primary'} bg-gradient text-light fw-bold`}>
            {title}
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