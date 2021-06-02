import Card from './utils/Card';
import IconText from './utils/IconText';

const DatabaseSelector = ({ loadDatabase }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const data = new Uint8Array(reader.result);

            loadDatabase(data);
        };

        reader.readAsArrayBuffer(file);
    };

    const handleButtonClick = () => {
        loadDatabase(new Uint8Array());
    };

    return (
        <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-9 my-5">
                <Card
                    title={<IconText iconClass="file-earmark-spreadsheet" text="Select a database" />}
                    useCardBody={true}
                >
                    <div className="row">
                        <div className="col-md-7">
                            <label htmlFor="uploadDatabase" className="form-label">Upload a database file</label>
                            <input
                                type="file"
                                id="uploadDatabase"
                                className="form-control"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="col">
                            <label className="form-label">Or</label>
                            <button
                                type="button"
                                className="btn btn-secondary d-block w-100"
                                onClick={handleButtonClick}
                            >
                                Use a blank database
                                </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DatabaseSelector;
