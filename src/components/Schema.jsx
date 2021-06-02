import useSchema from '../hooks/useSchema';
import Card from "./utils/Card";
import IconText from "./utils/IconText";

const Schema = ({ execCommand }) => {
    const { schema, loadSchema } = useSchema(execCommand);

    return (
        <Card title={<IconText iconClass="table" text="Tables" />} >
            {!schema && (
                <div className="card-body text-center text-muted fst-italic">
                    No tables. Why not add some?
                </div>
            )}

            {schema && (
                <div className="accordion accordion-flush" id="tableList">
                    {schema.map(table => (
                        <div key={table.id} className="accordion-item">
                            <h2 className="accordion-header" id={`table-header-${table.id}`}>
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#table-details-${table.id}`}
                                >
                                    {table.name}
                                </button>
                            </h2>

                            <div
                                id={`table-details-${table.id}`}
                                className="accordion-collapse collapse"
                                data-bs-parent="#tableList"
                            >
                                {table.columns.length === 0 && (
                                    <div className="accordion-body text-center text-muted fst-italic">
                                        No columns? They are either loading or something broke and they didn't load. Try reloading the tables to get the columns to appear.
                                    </div>
                                )}

                                {table.columns.length > 0 && (
                                    <table className="table table-sm font-monospace small">
                                        <tbody>
                                            {table.columns.map(column => (
                                                <tr key={`table-${table.id}-column-${column.id}`}>
                                                    <td>
                                                        {column.name}
                                                    </td>

                                                    <td>
                                                        {column.type}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="card-footer d-flex justify-content-end">
                <button type="button" className="btn btn-secondary btn-sm" onClick={loadSchema}>
                    <IconText iconClass="arrow-repeat" text="Reload Tables" textBeforeIcon={true} />
                </button>
            </div>
        </Card>
    );
};

export default Schema;
