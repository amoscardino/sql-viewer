import { useRef } from "react";
import Editor from '@monaco-editor/react'

const CommandEditor = ({ runCommand }) => {
    const editorRef = useRef(null);
    const editorOptions = {
        minimap: {
            enabled: false
        },
        renderLineHighlight: "none",
        renderWhitespace: "all",
        lineNumbers: "off"
    };

    const handleRunButtonClick = () => runCommand((editorRef.current.getValue() || '').trim());
    const handleEditorMount = (editor) => editorRef.current = editor;

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

                <button type="button" className="btn btn-primary" onClick={handleRunButtonClick}>
                    Run Command
                    </button>
            </div>
        </div>
    );
};

export default CommandEditor;
