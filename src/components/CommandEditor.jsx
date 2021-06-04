import { useRef } from 'react';
import Editor from '@monaco-editor/react'
import IconText from "./utils/IconText";
import Card from "./utils/Card";

const CommandEditor = ({ runCommand }) => {
    const editorRef = useRef(null);
    const editorOptions = {
        minimap: {
            enabled: false
        },
        renderLineHighlight: 'none',
        renderWhitespace: 'all',
        lineNumbers: 'off'
    };

    const handleRunButtonClick = () => {
        runCommand((editorRef.current.getValue() || '').trim())
    };
    
    const handleEditorMount = (editor) => {
        editorRef.current = editor
    };

    return (
        <Card
            title={<IconText iconClass="input-cursor-text" text="Command" />}
            useCardBody={true}
        >
            <Editor
                className="form-control mb-3"
                defaultLanguage="sql"
                height="150px"
                options={editorOptions}
                onMount={handleEditorMount} />

            <button type="button" className="btn btn-primary" onClick={handleRunButtonClick}>
                <IconText iconClass="play" text="Run Command" textBeforeIcon={true} />
            </button>
        </Card>
    );
};

export default CommandEditor;
