import Card from "./utils/Card";
import IconText from "./utils/IconText";

const Results = ({ results }) => {
    if (!results)
        return null;

    return (
        <Card
            headerBg="bg-secondary"
            title={<IconText className="terminal" text="Results" />}
        >
            {results.length === 0 && (
                <div className="card-body text-center text-muted fst-italic">
                    No results
                </div>
            )}

            {results.map((result, i) => (
                <div key={`r${i}`} className="table-responsive">
                    <table className="table table-sm font-monospace small">
                        <thead>
                            <tr>
                                <th></th>
                                {result.columns.map((c, j) => <th key={`c${j}`}>{c}</th>)}
                            </tr>
                        </thead>

                        <tbody>
                            {result.values.map((row, j) => (
                                <tr key={`${i},${j}`}>
                                    <td>{j}</td>
                                    {row.map((value, k) => (
                                        <td key={`${i},${j},${k}`}>
                                            {value}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </Card>
    );
};

export default Results;
