import { useHttp } from "api/http"
import { ListItemProps } from "screens/ProjectList"
import { cleanObject } from "utils"
import { useAsync } from "./useAsync"

export const useEditProject = () => {
    const client = useHttp()
    const { run, ...asyncResult } = useAsync<ListItemProps[]>()

    const mutate = (parama: Partial<ListItemProps>) => {
        return run(client(`projects/${parama.id}`, {params: cleanObject(parama), method: 'PATCH'}))
    }

    return {
        mutate,
        ...asyncResult
    }
}