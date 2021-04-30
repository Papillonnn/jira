import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
/**
 * 返回页面url中，指定键的参数值
 */

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParam, setSearchParam] = useSearchParams()
    return [
        useMemo(() => (
            keys.reduce((prev, key) => {
                return { ...prev, [key]: searchParam.get(key) || '' }
            }, {} as { [key in K]: string })
        ), [searchParam]),
        setSearchParam
    ] as const
} 