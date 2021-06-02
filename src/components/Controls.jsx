import IconText from './utils/IconText';

const Controls = ({ closeDatabase, exportDatabase }) => {
    const handleExportClick = () => {
        exportDatabase((buffer) => {
            const blob = new Blob([buffer]);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');

            a.href = url;
            a.download = 'sql.db';
            a.onclick = () => {
                setTimeout(() => {
                    window.URL.revokeObjectURL(url);
                }, 2000);
            };
            
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
    };

    return (
        <div className="d-flex justify-content-end mb-2 gap-2">
            <button type="button" className="btn btn-success btn-sm" onClick={handleExportClick}>
                <IconText iconClass="download" text="Export" textBeforeIcon={true} />
            </button>

            <button type="button" className="btn btn-danger btn-sm" onClick={closeDatabase}>
                <IconText iconClass="x-circle" text="Close" textBeforeIcon={true} />
            </button>
        </div>
    );
};

export default Controls;
