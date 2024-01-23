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

type CardProps = React.ComponentProps<typeof Card>

interface CardTemplateProps extends CardProps {
    template: TemplateData;
}



export function CardTemplate({ className, template, ...props }: CardTemplateProps) {
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

            <CardFooter>
                <Button className="w-full">View Template
                </Button>
            </CardFooter>
        </Card>
    )
}
