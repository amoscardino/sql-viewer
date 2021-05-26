import { useState, useEffect } from 'react';

const useDatabase = () => {
    const [worker, setWorker] = useState(null);
    const [isAppReady, setIsAppReady] = useState(false);
    const [isDbReady, setIsDbReady] = useState(false);
    const [isRunningCommand, setIsRunningCommand] = useState(false);

    useEffect(() => {
        let sqlWorker = new Worker("/worker.sql-wasm.js");

        sqlWorker.onerror = (err) => console.log(`SQL Worker Error: ${err}`);

        setWorker(sqlWorker);
        setIsAppReady(true);
    }, []);

    const loadDatabase = (data) => {
        if (!isAppReady)
            return;

        setIsDbReady(false);

        worker.onmessage = () => {
            console.log("Database opened");

            setIsDbReady(true);
        };

        worker.postMessage({
            action: "open",
            buffer: data
        });
    };

    const execCommand = (command, onEvent) => {
        if (isRunningCommand)
            return;
        setIsRunningCommand(true);

        worker.onmessage = (event) => {
            setIsRunningCommand(false);
            console.log(event);
            onEvent(event);
        };

        console.log(`Running sql: ${command}`);

        worker.postMessage({
            action: 'exec',
            sql: command
        });
    };

    return {
        worker,
        isAppReady,
        isDbReady,
        isRunningCommand,
        execCommand,
        loadDatabase
    }
};

export default useDatabase;