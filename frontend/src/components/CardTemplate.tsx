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
import { useToast } from "./ui/use-toast"

type CardProps = React.ComponentProps<typeof Card>

interface CardTemplateProps extends CardProps {
    template: TemplateData;
    pageQuery: number;
    type: string
}

export function CardTemplate({ className, type, pageQuery, template, ...props }: CardTemplateProps) {
    const { toast } = useToast();

    const { mutate, isPending, isError} = useMutation({
        mutationFn: deleteTemplate,
        mutationKey: ["template", localStorage.getItem("userId"), pageQuery],
        onSuccess: (data) => {
            toast({
                title: data.message
            })
            queryClient.invalidateQueries({ queryKey: ["template", localStorage.getItem("userId"), pageQuery] });
        },
        onError: (error) => {
            toast({
                title: error.message,
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
                <Button className="w-full">View Template</Button>
                {type === "user" && <Button variant="destructive" className="p-2" onClick={deleteTemplateHandler} disabled={isPending || isError}>
                    <Trash2 className="w-5 h-5" />
                </Button>}
            </CardFooter>
        </Card>
    )
}
