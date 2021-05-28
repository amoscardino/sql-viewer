import { useState } from "react";
import CommandEditor from "./CommandEditor";
import Results from "./Results";

const Command = ({ execCommand }) => {
    const [results, setResults] = useState(null);

    const handleRunCommand = (command) => {
        execCommand(command, setResults)
    };

    return (
        <>
            <CommandEditor runCommand={handleRunCommand} />
            <Results results={results} />
        </>
    );
};

export default Command;
