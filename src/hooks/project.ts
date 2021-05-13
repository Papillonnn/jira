import { useHttp } from "api/http"
// import { useCallback, useEffect } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { ListItemProps } from "screens/ProjectList"
import { cleanObject } from "utils"
// import { useAsync } from "./useAsync"

export const useProjectList = (param?: Partial<ListItemProps>) => {
    const client = useHttp()
    // const { run, ...result } = useAsync<ListItemProps[]>()
    // const fetchProjects = useCallback(
    //     () => client(`projects`, { params: cleanObject(param || {}) }),
    //     [client, param]
    // )
    
    // useEffect(() => {
    //     run(fetchProjects(), { retry: fetchProjects})
    // }, [param, fetchProjects, run])

    // return result
    return useQuery<ListItemProps[]>(['projects', param], () => client('projects', { params: cleanObject(param || {}) }))
}

export const useEditProject = () => {
    const client = useHttp()
    // const { run, ...asyncResult } = useAsync<ListItemProps[]>()

    // const mutate = (parama: Partial<ListItemProps>) => {
    //     return run(client(`projects/${parama.id}`, {params: cleanObject(parama), method: 'PATCH'}))
    // }

    // return {
    //     mutate,
    //     ...asyncResult
    // }
    const queryClient = useQueryClient()
    return useMutation(
        (parama: Partial<ListItemProps>) => (
            client(`projects/${parama.id}`, { params: cleanObject(parama), method: 'PATCH' })
        ),
        {
            onSuccess: () => queryClient.invalidateQueries('projects')
        }
    )
}

export const useAddProject = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        (parama: Partial<ListItemProps>) => (
            client(`projects`, { params: cleanObject(parama), method: 'POST' })
        ),
        {
            onSuccess: () => queryClient.invalidateQueries('projects')
        }
    )
}

export const useProject = (id?: number) => {
    const client = useHttp()
    return useQuery<ListItemProps>(
        ['project', id],
        () => client(`projects/${id}`),
        { enabled: !!id }
    )
}