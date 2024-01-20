import { getTemplates } from "@/lib/http"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

const HomePage = () => {
    // const [pageQuery, setPageQuery] = useState(0);
    // const [] = useState();

    // const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    //     useQuery({
    //         queryKey: ['templates', pageQuery],
    //         queryFn: (signal) => getTemplates({ signal, pageQuery }),
    //         placeholderData: keepPreviousData,
    //     })

    return (
        <div>HomePage</div>
    )
}

export default HomePage