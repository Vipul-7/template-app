import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

function ActionRichTextEditorQuill() {
    const [value, setValue] = useState('');

    return <ReactQuill theme="snow" value={value} onChange={setValue} placeholder='Write content here...'/>;
}

export default ActionRichTextEditorQuill;