import { useEffect, useState } from 'react';

const GET_TABLES_SQL = "select name from sqlite_master where type = 'table' and name not like 'sqlite_%' order by name;";
const GET_COLUMNS_SQL = "select * from pragma_table_info('{table}');";

const useSchema = (execCommand) => {
    const [schema, setSchema] = useState(null);

    const handleColumnResults = (results) => {
        setSchema(prevSchema => prevSchema.map(table => {
            return {
                ...table,
                columns: results[table.id].values.map(row => {
                    const [id, name, type, isNull, isPrimaryKey] = row;

                    return { id, name, type, isNull, isPrimaryKey }
                })
            };
        }))
    };

    const handleTableResults = (results) => {
        if (!results || results.length === 0)
            return;

        setSchema(results[0].values.map((table, i) => ({
            id: i,
            name: table,
            columns: []
        })));

        let columnSql = results[0].values.map(table => GET_COLUMNS_SQL.replace(/\{table\}/, table)).join('');

        if (columnSql)
            execCommand(columnSql, handleColumnResults);
    };

    const loadSchema = () => execCommand(GET_TABLES_SQL, handleTableResults);

    // ESLint does not like this next line because it wants us to have execCommand
    // in the deps array. But that causes the render loop and we intentionally want
    // loadSchema to be called ONCE on load.
    // eslint-disable-next-line
    useEffect(loadSchema, []);

    return { schema, reloadSchema: loadSchema };
};

export default useSchema;
