import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ActionRichTextEditorDraftW = () => {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    console.log(editorState.getCurrentContent());

    return (
        <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState}
        />
    )
}

export default ActionRichTextEditorDraftW