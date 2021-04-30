import { useHttp } from "api/http"
import { UserProps } from "screens/ProjectList"
import { useMount } from "utils"
import { useAsync } from "./useAsync"

export const useUserList = () => {
    const client = useHttp()
    const { run, data: users } = useAsync<UserProps[]>()
    
    useMount(() => {
        run(client('users'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    return {
        users
    }
}