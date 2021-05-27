import { useEffect, useState } from "react";

const GET_SCHEMA_SQL = "select name from sqlite_master where type = 'table' and name not like 'sqlite_%' order by name";

const Schema = ({ execCommand }) => {
    const [schema, setSchema] = useState(null);

    const loadSchema = () => {
        const handleResults = (results) => {
            if (!results)
                return;

            setSchema(results[0].values.map((table, i) => ({
                id: i,
                name: table
            })));
        };

        execCommand(GET_SCHEMA_SQL, handleResults);
    };

    // eslint-disable-next-line
    useEffect(loadSchema, []);

    if (!schema)
        return null;

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-primary bg-gradient text-light fw-bold" onClick={loadSchema}>
                Tables
            </div>

            <ul className="list-group list-group-flush">
                {schema.map(table => <li key={table.id} className="list-group-item">{table.name}</li>)}
            </ul>
        </div>
    );
};

export default Schema;
