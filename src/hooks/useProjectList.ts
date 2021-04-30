import { useHttp } from "api/http"
import { useEffect } from "react"
import { ListItemProps, ParamProps } from "screens/ProjectList"
import { cleanObject } from "utils"
import { useAsync } from "./useAsync"

export const useProjectList = (parama: ParamProps) => {
    const client = useHttp()
    const { run, isLoading, isError, error, data: list } = useAsync<ListItemProps[]>()
    
    useEffect(() => {
        run(client(`projects`, {params: cleanObject(parama)}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parama])

    return {
        isError,
        isLoading,
        error,
        list
    }
}