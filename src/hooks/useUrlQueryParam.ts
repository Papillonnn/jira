import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { cleanObject } from 'utils'
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ), [searchParam]),
        // iterator
        // https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
        // Object.fromEntries --- 将iterator转换为一个对象
        (params: Partial<{[key in K]: unknown}>) => {
            const o = cleanObject({
                ...Object.fromEntries(searchParam),
                ...params
            })
            setSearchParam(o)
        }
    ] as const
}