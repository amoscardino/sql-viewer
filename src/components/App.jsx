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
        execCommand(command, (event) => {
            setResults(event.data.results)
        });
    };

    if (!isAppReady) {
        return (
            <Layout>
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!isDbReady) {
        return (
            <Layout>
                <FilePicker loadDatabase={loadDatabase} />
            </Layout>
        )
    }

    return (
        <Layout sideBar={<Schema execCommand={execCommand} />}>
            <Command execCommand={onExecCommand} />
            <Results results={results} />
        </Layout>
    );
}

export default App;
