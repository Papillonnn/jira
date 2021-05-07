import { useEffect, useRef, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value

// export const isVoid = (value: unknown) => value === undefined || value === null || value === ''
// 沒有后端 配合json-server暂时这样写
export const isVoid = (value: unknown) => value === undefined || value === null || value === '' || value === 0

export const cleanObject = (object: {[key: string]: any}) => {
    const result = { ...object }
    Object.keys(result).forEach(key => {
        const value = result[key]
        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
        // TODO: 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
    }, [])
}

/**
 * 返回组件的挂载状态 组件已挂载返回true 组件未挂载或卸载返回false
 */
export const useMountedRef = () => {
    const mountedRef = useRef(false)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    })

    return mountedRef
}

export const useDebounce = <T>(value: T, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        // 在每次value变化以后，设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        // 每次在上一个useEffect处理完以后再运行
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
    const oldTitle = useRef(document.title).current
    // 页面加载时：oldTitle === 旧title 'jira任务管理系统'
    // 加载后：oldTitle === 新title

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {
                // 如果不指定依赖 读到的就是旧title
                document.title = oldTitle
            }
        }
    }, [oldTitle, keepOnUnmount])
}

export const resetRoute = () => window.location.href = window.location.origin