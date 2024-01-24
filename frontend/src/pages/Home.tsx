import { getTemplates } from "@/lib/http";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import ShowTemplates from "@/components/ShowTemplates";
import { Button } from "@/components/ui/button";

const HomePage = () => {
    const [pageQuery, setPageQuery] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const {
        isPending,
        isError,
        error,
        data,
        isFetching,
        isPlaceholderData,
    } = useQuery({
        queryKey: ["template", pageQuery],
        queryFn: ({ signal }) => getTemplates({ pageQuery, signal }),
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        if (data) {
            setTotalPages(data.totalPageCount);
        }
    }, [data]);

    return (
        <div className="p-4" >
            {isPending ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <>
                    {/* <ShowTemplates data={data.templates} /> */}
                    {data.templates && data.templates.length > 0 ? (
                        <>
                            <ShowTemplates data={data.templates} />
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
};

export default HomePage;
