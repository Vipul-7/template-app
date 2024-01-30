import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { TemplateData } from "@/lib/types"
import { Badge } from "../ui/badge"
import { format } from "date-fns";
import { ScrollArea } from "../ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import ThreeDotIcon from "../ui/icons/ThreeDotIcon";
import { Button } from "../ui/button";
import { DropdownMenuTemplate } from "./DropDownTemplate";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

interface Props {
    children: any,
    templateData: TemplateData,
    pageQuery: number
}

const DialogTemplate = ({ children, templateData, pageQuery }: Props) => {
    const navigate = useNavigate();
    const [formattedCreationDate, setFormattedCreationDate] = useState<string>("");
    const [formattedLastUpdatedDate, setFormattedLastUpdatedDate] = useState<string | null>(null);

    useEffect(() => {
        const creationTimestamp = new Date(templateData.createdAt);
        const updationTimestamp = new Date(templateData.updatedAt);

        setFormattedCreationDate(format(creationTimestamp, 'do MMM yyyy h:mmaaaa'));

        if (templateData.createdAt !== templateData.updatedAt) {
            setFormattedLastUpdatedDate(format(updationTimestamp, 'do MMM yyyy h:mmaaaa'));
        }
    }, [templateData.updatedAt])

    const navigateToEditTemplateHandler = () => {
        navigate(`/template/edit/${templateData.id}`, {
            state: {
                title: templateData.title,
                description: templateData.description,
                keywords: templateData.keywords,
                pageQuery
            }
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle className="flex justify-between items-center">
                        {templateData.title}
                        {localStorage.getItem("userId") === templateData.creator.id.toString() && <DropdownMenuTemplate templateId={templateData.id} pageQuery={pageQuery} navigateToEditPage={navigateToEditTemplateHandler}>
                            <Button variant="ghost" className="w-6 h-7 mr-9 p-1 cursor-pointer" >
                                <ThreeDotIcon className="w-full h-full " />
                            </Button>
                        </DropdownMenuTemplate>}
                    </DialogTitle>
                    <DialogDescription className="flex justify-start items-center">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" className="w-6 h-6 rounded-full" />
                            <AvatarFallback>Avatar{" "}</AvatarFallback>
                        </Avatar>
                        &nbsp;&nbsp;
                        <span>
                            {templateData.creator.firstName + " " + templateData.creator.lastName}
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <div className="break-all">
                    <div>{
                        templateData.keywords.map((keyword) => {
                            return (
                                <Badge key={keyword.id} className="mr-2" variant="outline">{keyword.value}</Badge>
                            )
                        })}</div>
                    <ScrollArea className="w-full h-[50vh]  bg-[#191919] p-2 rounded-md mt-2 overflow-auto custom-scrollbar whitespace-pre-line">
                        {templateData.description}
                    </ScrollArea>
                    <DialogDescription className="flex flex-col items-end">
                        <div>
                            Created at {" "}{formattedCreationDate}
                        </div>
                        {formattedLastUpdatedDate && <div>
                            Last Updated at {" "}{formattedLastUpdatedDate}
                        </div>}
                    </DialogDescription>
                </div>
            </DialogContent>
        </Dialog >
    )
}

export default DialogTemplate