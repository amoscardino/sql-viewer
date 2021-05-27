import { useState, useEffect, useRef } from 'react';

const useDatabase = () => {
    const worker = useRef(null);
    const [state, setState] = useState({
        isAppReady: false,
        isDbReady: false,
        isRunningCommand: false
    });

    useEffect(() => {
        let sqlWorker = new Worker("/worker.sql-wasm.js");

        sqlWorker.onerror = (err) => console.log(`SQL Worker Error: ${err}`);

        worker.current = sqlWorker;
        setState(prevState => ({ ...prevState, isAppReady: true }));
    }, []);

    const loadDatabase = (data) => {
        if (!state.isAppReady)
            return;

        setState(prevState => ({ ...prevState, isAppReady: false, isDbReady: false }));

        worker.current.onmessage = () => {
            console.log("Database opened");

            setState(prevState => ({ ...prevState, isAppReady: true, isDbReady: true }));
        };

        worker.current.postMessage({
            action: "open",
            buffer: data
        });
    };

    const execCommand = (command, handleResults) => {
        if (state.isRunningCommand)
            return;

        setState(prevState => ({ ...prevState, isRunningCommand: true }));

        worker.current.onmessage = (event) => {
            setState(prevState => ({ ...prevState, isRunningCommand: false }));
            console.log(event.data.results);
            handleResults(event.data.results);
        };

        console.log(`Running sql: ${command}`);

        worker.current.postMessage({
            action: 'exec',
            sql: command
        });
    };

    return {
        isAppReady: state.isAppReady,
        isDbReady: state.isDbReady,
        execCommand,
        loadDatabase
    }
};

export default useDatabase;
