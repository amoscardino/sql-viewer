import Card from './utils/Card';

const Results = ({ results }) => {
    if (!results)
        return null;

    if (results.length === 0) {
        <Card
            headerBg="bg-secondary"
            iconClass="terminal"
            title="Results"
        >
            <div className="card-body text-center text-muted fst-italic">
                No results
            </div>
        </Card>
    }

    return results.map((result, i) => (
        <Card
            key={`r${i}`}
            headerBg="bg-secondary"
            iconClass="terminal"
            title={`Results (${result.values.length} row${result.values.length === 1 ? '' : 's'})`}
        >
            <div className="table-responsive">
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
        </Card>
    ))
};

export default Results;
