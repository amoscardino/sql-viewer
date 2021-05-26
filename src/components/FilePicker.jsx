
const FilePicker = ({ loadDatabase }) => {
    const onFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const data = new Uint8Array(reader.result);

            loadDatabase(data);
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-primary bg-gradient text-light fw-bold">
                Select database file
            </div>

            <div className="card-body">
                <input type="file" className="form-control" onChange={onFileChange} />
            </div>
        </div>
    );
};

export default FilePicker;
