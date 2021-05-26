
const Results = ({ results }) => {
    if (!results)
        return null;

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-secondary bg-gradient text-light fw-bold">
                Results
            </div>

            {results && results.map((result, i) => (
                <table key={i} className="table">
                    <thead>
                        <tr>
                            <th></th>
                            {result.columns.map(column => <th key={column}>{column}</th>)}
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
            ))}
        </div>
    );
};

export default Results;
