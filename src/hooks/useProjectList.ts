import { useHttp } from "api/http"
import { useCallback, useEffect } from "react"
import { ListItemProps } from "screens/ProjectList"
import { cleanObject } from "utils"
import { useAsync } from "./useAsync"

export const useProjectList = (param: Partial<ListItemProps>) => {
    const client = useHttp()
    const { run, ...result } = useAsync<ListItemProps[]>()
    const fetchProjects = useCallback(
        () => client(`projects`, { params: cleanObject(param) }),
        [client, param]
    )
    
    useEffect(() => {
        run(fetchProjects(), { retry: fetchProjects})
    }, [param, fetchProjects, run])

    return result
}