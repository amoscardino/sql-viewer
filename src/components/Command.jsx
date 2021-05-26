import { useRef } from "react";

const Command = ({ execCommand }) => {
    var textareaRef = useRef();

    const runCommand = () => {
        const command = textareaRef.current.value;

        execCommand(command);
    };

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-primary bg-gradient text-light fw-bold">
                Command
            </div>

            <div className="card-body">
                <textarea ref={textareaRef} className="form-control mb-3"></textarea>

                <button type="button" className="btn btn-primary" onClick={runCommand}>
                    Run Command
                </button>
            </div>
        </div>
    );
};

export default Command;
