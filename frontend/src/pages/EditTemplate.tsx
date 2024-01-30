import CreateTemplate from '@/components/CreateTemplate'
import { useToast } from '@/components/ui/use-toast';
import { editTemplate } from '@/lib/http';
import { TemplateInputs } from '@/lib/types';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router'

const EditTemplatePage = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { templateId } = useParams();
    const location = useLocation();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: editTemplate,
        mutationKey: ["template", location.state.pageQuery],
        onSuccess: (data) => {
            navigate("/")

            toast({
                title: data.message,
                description: data.template.title
            })
        }
    })

    const formSubmitHandler = (formValues: TemplateInputs) => {
        mutate({ ...formValues, templateId: Number(templateId) });
    }

    return (
        <CreateTemplate
            isSending={isPending}
            isSubmissionError={isError}
            submissionError={error}
            onSubmit={formSubmitHandler}
            templateData={
                {
                    id: Number(templateId),
                    title: location.state.title,
                    description: location.state.description,
                    keywords: location.state.keywords
                }
            }
        />
    )
}

export default EditTemplatePage