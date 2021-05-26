import { useEffect, useState } from "react";

const GET_SCHEMA_SQL = "select name from sqlite_master where type = 'table' and name not like 'sqlite_%' order by name";

const Schema = ({ execCommand }) => {
    const [schema, setSchema] = useState(null);

    useEffect(() => {
        const onEvent = (event) => {
            var results = event.data.results;

            if (!results)
                return;

            setSchema(results[0].values.map(table => ({
                id: table,
                name: table
            })));
        };

        execCommand(GET_SCHEMA_SQL, onEvent);
    }, []);

    if (!schema)
        return null;

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-primary bg-gradient text-light fw-bold">
                Schema
            </div>

            <ul className="list-group list-group-flush">
                {schema.map(table => <li key={table.id} className="list-group-item">{table.name}</li>)}
            </ul>
        </div>
    );
};

export default Schema;