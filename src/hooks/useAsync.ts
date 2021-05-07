import { useCallback, useState } from "react"
import { useMountedRef } from "utils"

interface State<D> {
    error: Error | null;
    data: D | null;
    status: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    status: 'idle',
    error: null,
    data: null
}

const defaultConfig = {
    throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = {
        ...defaultConfig,
        ...initialConfig
    }
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })
    const [retry, setRetry] = useState(() => () => { })
    const mountedRef = useMountedRef()

    const setData = useCallback(
        (data: D) => setState({
            data,
            status: 'success',
            error: null
        }),
        []
    )

    const setError = useCallback(
        (error: Error) => setState({
            data: null,
            status: 'error',
            error
        }),
        []
    )

    const run = useCallback(
        (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
            if (!promise || !promise.then) {
                throw new Error('请传入Promise类型的数据')
            }
            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig?.retry(), runConfig)
                }
            })
            setState(prevState => ({
                ...prevState,
                status: 'loading'
            }))
            return promise.then(data => {
                // 组件处于挂载状态时才setData
                if (mountedRef.current) {
                    setData(data)
                }
                return data
            }).catch(error => {
                // catch会消化异常，如果不主动抛出，外面是接收不到异常的
                setError(error)
                if (config.throwOnError) {
                    return Promise.reject(error)
                }
                return error
            })
        },
        [config.throwOnError, mountedRef, setData, setError]
    )

    return {
        isIdle: state.status === 'idle',
        isLoading: state.status === 'loading',
        isError: state.status === 'error',
        isSuccess: state.status === 'success',
        run,
        setData,
        setError,
        // retry调用时，重新跑一遍run，让state刷新
        retry,
        ...state
    }
}