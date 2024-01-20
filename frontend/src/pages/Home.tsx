import { getTemplates } from "@/lib/http"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import ShowTemplates from "@/components/ShowTemplates"


const HomePage = () => {
    const [pageQuery, setPageQuery] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const { isPending, isError, error, data, isFetching, isPlaceholderData } =
        useQuery({
            queryKey: ['templates', pageQuery],
            queryFn: (signal) => getTemplates({ signal, pageQuery }),
            placeholderData: keepPreviousData,
        });

    useEffect(() => {
        if (data) {
            setTotalPages(data.totalPageCount);
        }
    });

    return (
        <>
            {isPending ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <ShowTemplates {...data} />
            )}
            <div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        {/* <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem> */}
                        {Array.from(Array(totalPages).keys()).map((i) => (
                            <PaginationItem key={i}>
                                <PaginationLink href="#" onClick={() => setPageQuery(i)}>{i + 1}</PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    )
}

export default HomePage