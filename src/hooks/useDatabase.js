import { useState, useEffect, useRef, useCallback } from 'react';

export const DATABASE_STATE = {
    busy: 'busy',
    notLoaded: 'not loaded',
    ready: 'ready',
    runningCommand: 'running command'
};

export const useDatabase = () => {
    const worker = useRef(null);
    const [databaseState, setDatabaseState] = useState(DATABASE_STATE.busy);
    const isDev = process.env.NODE_ENV === 'development';

    useEffect(() => {
        let sqlWorker = new Worker('/worker.sql-wasm.js');

        if (isDev)
            sqlWorker.onerror = (err) => console.log(`SQL Worker Error: ${err}`);

        worker.current = sqlWorker;
        setDatabaseState(DATABASE_STATE.notLoaded);
    }, [isDev]);

    const loadDatabase = useCallback((data) => {
        if (databaseState === DATABASE_STATE.busy)
            return;

        setDatabaseState(DATABASE_STATE.busy);

        worker.current.onmessage = () => {
            if (isDev)
                console.log('Database opened');

            setDatabaseState(DATABASE_STATE.ready);
        };

        if (data && data.length) {
            if (isDev)
                console.log('Opening database from file');

            worker.current.postMessage({
                action: 'open',
                buffer: data
            });
        }
        else {
            if (isDev)
                console.log('Opening blank database');

            worker.current.postMessage({ action: 'open' });
        }
    }, [databaseState, isDev]);

    const execCommand = useCallback((command, handleResults) => {
        if (databaseState === DATABASE_STATE.busy || databaseState === DATABASE_STATE.runningCommand)
            return;

        setDatabaseState(DATABASE_STATE.runningCommand);

        worker.current.onmessage = (event) => {
            if (isDev)
                console.log(event.data.results);

            setDatabaseState(DATABASE_STATE.ready);
            handleResults(event.data.results);
        };

        if (isDev)
            console.log(`Running sql: ${command}`);

        worker.current.postMessage({
            action: 'exec',
            sql: command
        });
    }, [databaseState, isDev]);

    const exportDatabase = useCallback((handleBuffer) => {
        if (databaseState === DATABASE_STATE.busy || databaseState === DATABASE_STATE.runningCommand)
            return;

        setDatabaseState(DATABASE_STATE.runningCommand);

        worker.current.onmessage = (event) => {
            if (isDev)
                console.log(event.data.buffer);

            setDatabaseState(DATABASE_STATE.ready);
            handleBuffer(event.data.buffer);
        };

        if (isDev)
            console.log('Exporting database');

        worker.current.postMessage({ action: 'export' });
    }, [databaseState, isDev]);

    const closeDatabase = useCallback(() => {
        if (databaseState === DATABASE_STATE.busy || databaseState === DATABASE_STATE.runningCommand)
            return;

        setDatabaseState(DATABASE_STATE.busy);

        worker.current.onmessage = () => {
            setDatabaseState(DATABASE_STATE.notLoaded);

            if (isDev)
                console.log('Database closed');
        };

        worker.current.postMessage({
            action: 'close'
        });
    }, [databaseState, isDev]);

    return {
        databaseState,
        loadDatabase,
        execCommand,
        exportDatabase,
        closeDatabase
    }
};
