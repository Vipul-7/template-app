import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { TemplateData } from "@/lib/types"
import { Badge } from "./ui/badge"
import { format } from "date-fns";
import { ScrollArea } from "./ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import ThreeDotIcon from "./ui/icons/ThreeDotIcon";
import { Button } from "./ui/button";
import { DropdownMenuTemplate } from "./DropDownTemplate";

interface Props {
    children: any,
    templateData: TemplateData,
    pageQuery: number
}

const DialogTemplate = ({ children, templateData, pageQuery }: Props) => {
    const timestamp = new Date(templateData.createdAt);
    const formattedDate = format(timestamp, 'do MMM yyyy h:mmaaaa');

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle className="flex justify-between items-center">
                        {templateData.title}
                        {localStorage.getItem("userId") === templateData.creator.id.toString() && <DropdownMenuTemplate templateId={templateData.id} pageQuery={pageQuery}>
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
                    <ScrollArea className="w-full h-[40%] bg-[#191919] p-2 rounded-md mt-2 overflow-auto custom-scrollbar whitespace-pre-line">
                        {templateData.description}
                    </ScrollArea>
                    <DialogDescription className="flex justify-end">
                        Created at {" "}{formattedDate}
                    </DialogDescription>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DialogTemplate