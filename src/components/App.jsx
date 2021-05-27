import Layout from './Layout';
import FilePicker from './FilePicker'
import Schema from './Schema'
import Command from './Command'
import Results from './Results'

import useDatabase from '../hooks/useDatabase'
import { useState } from 'react';

const App = () => {
    const { isAppReady, isDbReady, execCommand, loadDatabase } = useDatabase();
    const [results, setResults] = useState(null);

    const onExecCommand = (command) => {
        const handleResults = (results) => {
            setResults(results)
        };

        execCommand(command, handleResults);
    };

    if (isAppReady && isDbReady) {
        return (
            <Layout sideBar={<Schema execCommand={execCommand} />}>
                <Command execCommand={onExecCommand} />
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
                <FilePicker loadDatabase={loadDatabase} />
            )}
        </Layout>
    );
}

export default App;
