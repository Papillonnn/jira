import { useCallback, useReducer, useState } from "react"
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

/**
 * 组件处于挂载状态时才进行操作
 * @param dispatch 
 * @returns 
 */
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef()
    return useCallback(
        (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
        [dispatch, mountedRef]
    )
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = {
        ...defaultConfig,
        ...initialConfig
    }
    const [state, dispatch] = useReducer(
        (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action}),
        {...defaultInitialState, ...initialState}
    )
    const safeDispatch = useSafeDispatch(dispatch)
    const [retry, setRetry] = useState(() => () => { })

    const setData = useCallback(
        (data: D) => safeDispatch({
            data,
            status: 'success',
            error: null
        }),
        [safeDispatch]
    )

    const setError = useCallback(
        (error: Error) => safeDispatch({
            data: null,
            status: 'error',
            error
        }),
        [safeDispatch]
    )

    const run = useCallback(
        (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
            if (!promise || !promise.then) {
                throw new Error('请传入Promise类型的数据')
            }
            safeDispatch({ status: 'loading' })

            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig?.retry(), runConfig)
                }
            })
            return promise.then(data => {
                setData(data)
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
        [config.throwOnError, safeDispatch, setData, setError]
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