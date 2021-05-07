import { useUrlQueryParam } from 'hooks/useUrlQueryParam';
import { useMemo } from 'react';

export const useProjectSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    return [
        useMemo(() => (
            { ...param, personId: Number(param.personId) }
        ), [param]),
        setParam
    ] as const
}