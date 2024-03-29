import {
    Pagination,
    PaginationContent,
    // PaginationEllipsis,
    PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { TemplateData } from "@/lib/types";
import { CardTemplate } from "./All templates/CardTemplate";
import SkeletonDisplayTemplates from "./SkeletonDisplayTemplates";

interface Props {
    pageQuery: number;
    setPageQuery: (page: number) => void;
    totalPages: number;
    data: any;
    isPending: boolean;
    isError: boolean;
    error: any;
    type: string;
}

const DisplayTemplates = ({ pageQuery, setPageQuery, totalPages, type, data, isPending, isError, error }: Props) => {
    return (
        <div className="p-4" >
            {isPending ? (
                <SkeletonDisplayTemplates />
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <>
                    {data.templates && data.templates.length > 0 ? (
                        <>
                            {<div className="grid grid-cols-3 justify-items-center gap-4">
                                {data.templates.map((item: TemplateData) => (
                                    <CardTemplate key={item.id} template={item} pageQuery={pageQuery} type={type} />
                                ))}
                            </div>}
                            <div className="p-2 my-2">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <Button
                                                onClick={() => setPageQuery(pageQuery - 1)}
                                                disabled={pageQuery === 1}
                                                variant="ghost"
                                            >{"< "}Previous</Button>
                                        </PaginationItem>
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <PaginationItem key={index}>
                                                <Button
                                                    onClick={() => setPageQuery(index + 1)}
                                                    variant={pageQuery === index + 1 ? "outline" : "ghost"}
                                                >
                                                    {index + 1}
                                                </Button>
                                            </PaginationItem>
                                        ))}
                                        <PaginationItem>
                                            <Button
                                                onClick={() => setPageQuery(pageQuery + 1)}
                                                disabled={pageQuery === totalPages}
                                                variant="ghost"
                                            >Next{" >"}</Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </>
                    ) : (
                        <div>No templates available.</div>
                    )}
                </>
            )}
        </div>
    );
}

export default DisplayTemplates