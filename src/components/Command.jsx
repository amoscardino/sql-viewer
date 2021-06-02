import useResults from '../hooks/useResults';
import CommandEditor from './CommandEditor';
import Results from './Results';

const Command = ({ execCommand }) => {
    const { results, runCommand } = useResults(execCommand);

    return (
        <>
            <CommandEditor runCommand={runCommand} />
            <Results results={results} />
        </>
    );
};

export default Command;
