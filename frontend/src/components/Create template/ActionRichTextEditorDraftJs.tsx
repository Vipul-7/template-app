import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { BoldIcon, HeadingIcon, ItalicIcon, List, ListOrderedIcon, UnderlineIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ActionRichTextEditorDraftJs: React.FC = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const handleKeyCommand = (command: string): 'handled' | 'not-handled' => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const onBoldClick = () => {
        setEditorState(prevState => RichUtils.toggleInlineStyle(prevState, 'BOLD'));
    };

    const onItalicClick = () => {
        setEditorState(prevState => RichUtils.toggleInlineStyle(prevState, 'ITALIC'));
    };

    const onUnderlineClick = () => {
        setEditorState(prevState => RichUtils.toggleInlineStyle(prevState, 'UNDERLINE'));
    };

    const onBulletListClick = () => {
        setEditorState(prevState => RichUtils.toggleBlockType(prevState, 'unordered-list-item'));
    };

    const onOrderedListClick = () => {
        setEditorState(prevState => RichUtils.toggleBlockType(prevState, 'ordered-list-item'));
    };

    const onHeadingClick = () => {
        setEditorState(prevState => RichUtils.toggleBlockType(prevState, 'header-one'));
    };

    const getEditorValue = () => {
        const contentState = editorState.getCurrentContent();
        const editorText = contentState.getPlainText('\n');
        return editorText;
    };

    return (
        <div className='rounded-md border border-input p-2'>
            <ToggleGroup type="multiple" className={cn(
                "flex justify-start mb-3 rounded-md border border-input"
            )}>
                <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={onBoldClick}>
                    <BoldIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic" onClick={onItalicClick}>
                    <ItalicIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough" onClick={onUnderlineClick}>
                    <UnderlineIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="bulletList" aria-label="Toggle bullet list" onClick={onBulletListClick}>
                    <List className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="orderedList" aria-label="Toggle ordered list" onClick={onOrderedListClick}>
                    <ListOrderedIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="heading" aria-label="Toggle heading" onClick={onHeadingClick}>
                    <HeadingIcon className="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
            <Editor editorState={editorState} handleKeyCommand={handleKeyCommand} onChange={setEditorState} />
            <button onClick={() => console.log(getEditorValue())}>Get Written Value</button>
        </div>
    );
};

export default ActionRichTextEditorDraftJs;
