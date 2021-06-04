import { useState } from 'react';

const useResults = (execCommand) => {
    const [results, setResults] = useState(null);

    const runCommand = (command) => {
        execCommand(command, (data) => {
            setResults(data)
        });
    };

    return { results, runCommand };
};

export default useResults;
