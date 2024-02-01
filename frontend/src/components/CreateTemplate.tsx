import { Button } from "./ui/button"
import { CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import React, { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import CrossIcon from "./ui/icons/CrossIcon"
import { TemplateInputs } from "@/lib/types"
import { useFormik } from "formik"
import { useNavigate } from "react-router"

interface TemplateInputsErrors {
    title?: string;
    description?: string;
    tags?: string;
}

interface Props {
    onSubmit: (values: TemplateInputs) => void,
    isSending: boolean,
    isSubmissionError: boolean,
    submissionError: Error | null,
    templateData: {
        id: number,
        title: string,
        description: string,
        keywords: {
            id: number,
            value: string
        }[]
    } | null;
}

const validate = (values: TemplateInputs) => {
    const errors: TemplateInputsErrors = {};

    if (!values.title || values.title.length < 5) {
        errors.title = "Title must be atleast 5 characters";
    }

    if (!values.description || values.description.length < 10) {
        errors.description = "Description must be atleast 10 characters";
    }

    if (values.tags && values.tags.length === 0) {
        errors.tags = "Add atleast one tag";
    }

    return errors;
}

const CreateTemplate = (props: Props) => {
    const navigate = useNavigate();
    const [tagInput, setTagInput] = useState<string>("");
    const [tag, setTag] = useState<string[]>([]);

    useEffect(() => {
        if (props.templateData) {
            setTag(props.templateData.keywords.map((keyword) => keyword.value));
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            title: props.templateData ? props.templateData.title : "",
            description: props.templateData ? props.templateData.description : "",
            tags: props.templateData ? props.templateData.keywords.map((keyword) => keyword.value) : []
        },
        validate,
        onSubmit: (values) => {
            props.onSubmit(values);
        },
    })

    const tagAddHandler = () => {
        if (tagInput !== "" && tag.length < 3) {
            setTag([...tag, tagInput]);
            setTagInput("");
            formik.setFieldValue("tags", [...tag, tagInput]);
        }
        if (tag.length === 3) {
            formik.setFieldError("tags", "You can add upto 3 tags");
        }
    }

    const tagInputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setTagInput(e.currentTarget.value);
    }

    const removeTagHandler = (tagIndex: number) => {
        const newArr = tag.filter((t, curIdx) => curIdx !== tagIndex);
        formik.setFieldValue("tags", newArr);
        setTag(newArr);
    }

    return (
        <form className="p-8 flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <CardHeader>
                <CardTitle>Create New Template</CardTitle>
                <CardDescription>
                    Your templates are seen by everybody, but you are the only one who can update them.
                </CardDescription>
            </CardHeader>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="title" className="text-left">Title</Label>
                <Input type="title" id="title" placeholder="Provide a corresponding title.
                " onChange={formik.handleChange} value={formik.values.title} autoComplete="off"></Input>
                {formik.touched.title && formik.errors.title ? (<div className="text-xs text-red-500 flex justify-start">{formik.errors.title}</div>
                ) : null}
            </div>
            <div className="grid w-full gap-1.5">
                <Label htmlFor="description" className="text-left">Description</Label>
                <Textarea placeholder="Write your template here..." id="description" className="resize-none min-h-64"
                    onChange={formik.handleChange} value={formik.values.description} />
                {formik.touched.description && formik.errors.description ? (<div className="text-xs text-red-500 flex justify-start">{formik.errors.description}</div>
                ) : null}
            </div>
            <div className="grid max-w-xs items-center gap-1.5">
                <Label htmlFor="tags" className="text-left">Tags</Label>
                <div className="flex justify-start gap-1">
                    {tag && tag.map((t, index) => {
                        return (
                            <div className="flex justify-between" key={`tag-${index}`}>
                                <Badge key={`tag-${index}`} variant="default" className="w-full">
                                    {t}
                                </Badge>
                                <Button className="m-0 p-1 h-3" variant="secondary" style={{ marginLeft: "-10px", marginTop: "-4px" }} type="button" onClick={() => removeTagHandler(index)}>
                                    <CrossIcon />
                                </Button>
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-start">
                    <Input id="tags" placeholder="Add tag from 1 to 3" value={tagInput} onChange={tagInputChangeHandler} autoComplete="off" />
                    <div style={{ marginLeft: "-55px" }} className="flex items-center">
                        <Button type="button" variant="secondary" className="h-7 m-[-6px]" onClick={tagAddHandler}>add</Button>
                    </div>
                </div>
                {formik.errors.tags ? (
                    <div className="text-xs text-red-500 flex justify-start">{formik.errors.tags}</div>
                ) : null}
            </div>

            <div className="flex justify-start gap-4">
                <Button type="submit" disabled={props.isSending}>Save</Button>
                <Button variant="outline" onClick={() => navigate("/")}>Cancel</Button>
                {props.isSubmissionError &&
                    <div className="text-xs text-red-500 flex justify-start items-center">
                        {props.submissionError?.message}
                    </div>}
            </div>
        </form>
    )
}

export default CreateTemplate;