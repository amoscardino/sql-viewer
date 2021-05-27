
const Results = ({ results }) => {
    if (!results)
        return null;

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-secondary bg-gradient text-light fw-bold">
                Results
            </div>

            {results.length === 0 && (
                <div className="card-body text-center text-muted fst-italic">
                    No results
                </div>
            )}

            {results.map((result, i) => (
                <div key={`r${i}`} className="table-responsive">
                    <table className="table">
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
        </div>
    );
};

export default Results;
