import React, { useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./ActionRichTextEditorDraftW.css"
import useDebounce from "@/hooks/useDebounce";

const ActionRichTextEditorDraftW = ({ setContentValue }: { setContentValue: React.Dispatch<React.SetStateAction<string>> }) => {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    const debouncedHtml = useDebounce(getEditorValue(), 4000);

    function getEditorValue() {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const html = draftToHtml(rawContentState);
        return html;
    };

    useEffect(() => {
        setContentValue(debouncedHtml);
    }, [debouncedHtml]);

    return (
        <Editor
            editorState={editorState}
            toolbarClassName="toolbar"
            wrapperClassName="wrapper"
            editorClassName="editor"
            onEditorStateChange={setEditorState}
        />
    )
}

export default ActionRichTextEditorDraftW;
