import Layout from './Layout';
import FilePicker from './FilePicker'
import Schema from './Schema'
import Command from './Command'
import Results from './Results'

import useDatabase from '../hooks/useDatabase'
import { useState } from 'react';

const App = () => {
    const { isAppReady, isDbReady, isRunningCommand, execCommand, loadDatabase } = useDatabase();
    const [results, setResults] = useState(null);

    const onExecCommand = (command) => {
        if (isRunningCommand)
            return;

        execCommand(command, (event) => { setResults(event.data.results) });
    };

    if (!isAppReady) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <Layout
            topBar={!isDbReady && <FilePicker loadDatabase={loadDatabase} />}
            sideBar={isDbReady && <Schema execCommand={execCommand} />}
        >
            {isDbReady && <Command execCommand={onExecCommand} />}
            {isDbReady && <Results results={results} />}
        </Layout>
    );
}

export default App;
