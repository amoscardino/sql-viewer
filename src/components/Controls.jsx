
const Controls = ({ closeDatabase, exportDatabase }) => {
    const handleExportClick = () => {
        exportDatabase((buffer) => {
            const blob = new Blob([buffer]);
            const a = document.createElement('a');

            document.body.appendChild(a);
            a.href = window.URL.createObjectURL(blob);
            a.download = 'sql.db';
            a.onclick = () => {
                setTimeout(() => {
                    window.URL.revokeObjectURL(a.href);
                }, 1500);
            };
            a.click();
            a.remove();
        });
    };

    return (
        <div className="d-flex justify-content-end mb-2 gap-2">
            <button type="button" className="btn btn-success btn-sm" onClick={handleExportClick}>
                Export Database
            </button>

            <button type="button" className="btn btn-danger btn-sm" onClick={closeDatabase}>
                Close Database
            </button>
        </div>
    );
};

export default Controls;
