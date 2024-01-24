import CreateTemplate from "@/components/CreateTemplate"
import { createTemplate } from "@/lib/http"
import { TemplateInputs } from "@/lib/types";
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router";

const CreateTemplatePage = () => {
    const navigate = useNavigate();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createTemplate,
        mutationKey: ["template"],
        onSuccess: (data) => {
            navigate("/")
        }
    });

    const formSubmitHandler = (formValues: TemplateInputs) => {
        mutate(formValues);
    }

    return (
        <CreateTemplate onSubmit={formSubmitHandler} isSending={isPending} isSubmissionError={isError} submissionError={error} />
    )
}

export default CreateTemplatePage