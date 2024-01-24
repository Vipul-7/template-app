import { Button } from "./ui/button"
import { CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import React, { useState } from "react"
import { Badge } from "./ui/badge"
import CrossIcon from "./ui/icons/CrossIcon"

const CreateTemplate = () => {
    const [tagInput, setTagInput] = useState<string>("");
    const [tag, setTag] = useState<string[]>([]);

    const tagAddHandler = () => {
        if (tagInput !== "" && tag.length < 3) {
            setTag([...tag, tagInput]);
            setTagInput("");
        }
    }

    const tagInputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setTagInput(e.currentTarget.value);
    }

    const removeTagHandler = (tagIndex: number) => {
        const newArr = tag.filter((t, curIdx) => curIdx !== tagIndex);
        setTag(newArr);
    }

    return (
        <div className="p-8 flex flex-col gap-4">
            <CardHeader>
                <CardTitle>Create New Template</CardTitle>
                <CardDescription>
                    Your templates are seen by everybody, but you are the only one who can update them.
                </CardDescription>
            </CardHeader>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="title" className="text-left">Title</Label>
                <Input type="title" id="title" placeholder="Provide a corresponding title."></Input>
            </div>
            <div className="grid w-full gap-1.5">
                <Label htmlFor="description" className="text-left">Description</Label>
                <Textarea placeholder="Write your template here..." id="description" className="resize-none min-h-64" />
            </div>
            <div className="grid max-w-xs items-center gap-1.5">
                <Label htmlFor="tags" className="text-left mb-1">Tags</Label>
                <div className="flex justify-start gap-1">
                    {tag && tag.map((t, index) => {
                        return (
                            <div className="flex justify-between" key={`tag-${index}`}>
                                <Badge key={`tag-${index}`} variant="default" className="w-full">
                                    {t}
                                </Badge>
                                <Button className="m-0 p-1 h-3" variant="secondary" style={{ marginLeft: "-10px", marginTop: "-4px" }} onClick={() => removeTagHandler(index)}>
                                    <CrossIcon />
                                </Button>
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-start">
                    <Input type="tags" id="tags" placeholder="Add tag from 1 to 3" value={tagInput} onChange={tagInputChangeHandler} />
                    <div style={{ marginLeft: "-55px" }} className="flex items-center">
                        <Button variant="secondary" className="h-7 m-[-6px]" onClick={tagAddHandler}>add</Button>
                    </div>
                </div>
            </div>
            <div className="flex justify-start gap-4">
                <Button>Save</Button>
                <Button variant="outline">Cancel</Button>
            </div>
        </div>
    )
}

export default CreateTemplate;