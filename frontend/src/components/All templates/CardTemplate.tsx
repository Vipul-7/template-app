import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TemplateData } from '@/lib/types'
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { deleteTemplate, queryClient } from "@/lib/http"
import { useToast } from "../ui/use-toast";
import AlertDialogTemplate from "../AlertDialogTemplate"
import DialogTemplate from "../View template/DialogTemplate"
import { useContext } from "react"
import { authContext } from "@/App"
import ClipLoader from "react-spinners/ClipLoader"
import { AxiosError } from "axios"

type CardProps = React.ComponentProps<typeof Card>

interface CardTemplateProps extends CardProps {
    template: TemplateData;
    pageQuery: number;
    type: string
}

export function CardTemplate({ className, type, pageQuery, template, ...props }: CardTemplateProps) {
    const { toast } = useToast();
    const { user } = useContext(authContext);

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: deleteTemplate,
        mutationKey: ["template", user?.id, pageQuery],
        onSuccess: (data) => {
            toast({
                title: data.message
            })
            queryClient.invalidateQueries({ queryKey: ["template", user?.id, pageQuery] });
        },
        onError: (error) => {
            const errorMessage = ((error as AxiosError)?.response?.data as { message?: string })?.message ||
                error.message;
            toast({
                title: errorMessage,
                variant: "destructive"
            })
        }
    })

    const deleteTemplateHandler = () => {
        mutate(template.id);
    }

    return (
        <Card className={cn("w-[380px]", className)} {...props}>
            <CardHeader>
                <CardTitle>{template.title}</CardTitle>
                <CardDescription>{template.creator.firstName + " " + template.creator.lastName}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <div>Total {template.description.trim().length} Characters long</div>
                    <div className="grid gap-2">
                        <div className="flex justify-center flex-wrap gap-2">
                            {template.keywords.length === 0 && <div>No keywords</div>}
                            {template.keywords.map((tag) => (
                                <Badge key={tag.id} variant="secondary">{tag.value}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <DialogTemplate templateData={template} pageQuery={pageQuery}>
                    {/* <Link to={`template/${template.id}`} className="w-full"> */}
                    <Button className="w-full" >View Template</Button>
                    {/* </Link> */}
                </DialogTemplate>
                {type === "user" &&
                    <AlertDialogTemplate deleteTemplateHandler={deleteTemplateHandler} dialogDescription="This action cannot be undone. This will permanently delete the template and you will not be able to recover it.">
                        <Button variant="destructive" className="p-2" disabled={isPending}>
                            {!isPending && <Trash2 className="w-5 h-5" />}
                            {isPending && <ClipLoader color="var(rgb(--foreground))" cssOverride={{ width: "20px", height: "20px" }} />}
                        </Button>
                    </AlertDialogTemplate>
                }
            </CardFooter>
        </Card>
    )
}
