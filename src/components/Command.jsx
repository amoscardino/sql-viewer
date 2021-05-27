import { useRef, useState } from "react";
import Editor from '@monaco-editor/react'

const Command = ({ execCommand }) => {
    const [editorReady, setEditorReady] = useState(false);
    const editorRef = useRef(null);

    const editorOptions = {
        minimap: {
            enabled: false
        },
        renderLineHighlight: "none",
        lineNumbers: "off"
    };

    const handleRunButtonClick = () => {
        if (!editorReady)
            return;

        const sql = (editorRef.current.getValue() || '').trim();

        if (sql)
            execCommand(sql);
    };

    const handleEditorMount = (editor) => {
        editorRef.current = editor;
        setEditorReady(true);
    };

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-primary bg-gradient text-light fw-bold">
                Command
            </div>

            <div className="card-body">
                <Editor
                    className="form-control mb-3"
                    defaultLanguage="sql"
                    height="150px"
                    options={editorOptions}
                    onMount={handleEditorMount} />

                {editorReady && (
                    <button type="button" className="btn btn-primary" onClick={handleRunButtonClick}>
                        Run Command
                    </button>
                )}
            </div>
        </div>
    );
};

export default Command;
