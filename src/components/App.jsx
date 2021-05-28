import Layout from './Layout';
import DatabaseSelector from './DatabaseSelector'
import Schema from './Schema'
import Command from './Command'
import Results from './Results'

import useDatabase from '../hooks/useDatabase'
import { useState } from 'react';

const App = () => {
    const { isAppReady, isDbReady, execCommand, loadDatabase } = useDatabase();
    const [results, setResults] = useState(null);

    const handleExecCommand = (command) => execCommand(command, (results) => setResults(results));

    if (isAppReady && isDbReady) {
        return (
            <Layout sideBar={<Schema execCommand={execCommand} />}>
                <Command execCommand={handleExecCommand} />
                <Results results={results} />
            </Layout>
        );
    }

    return (
        <Layout>
            {!isAppReady && (
                <div className="d-flex justify-content-center m-5">
                    <div className="spinner-border">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {isAppReady && !isDbReady && (
                <DatabaseSelector loadDatabase={loadDatabase} />
            )}
        </Layout>
    );
};

export default App;
