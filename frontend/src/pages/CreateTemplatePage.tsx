import CreateTemplate from "@/components/CreateTemplate"
import { useToast } from "@/components/ui/use-toast";
import { createTemplate } from "@/lib/http"
import { TemplateInputs } from "@/lib/types";
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router";

const CreateTemplatePage = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createTemplate,
        mutationKey: ["template"],
        onSuccess: (data) => {
            navigate("/")

            toast({
                title: data.message,
                description: data.template.title
            })
        },
    });

    const formSubmitHandler = (formValues: TemplateInputs) => {
        mutate(formValues);
    }

    return (
        <CreateTemplate onSubmit={formSubmitHandler} isSending={isPending} isSubmissionError={isError} submissionError={error} />
    )
}

export default CreateTemplatePage