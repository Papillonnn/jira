import React, { useState } from 'react';
import List from './List';
import SearchPanel from './SearchPanel';
import { useDebounce } from 'utils';
import styled from '@emotion/styled';
import { useProjectList } from 'hooks/useProjectList';
import { useUserList } from 'hooks/useUserList';
import { useUrlQueryParam } from 'hooks/useUrlQueryParam';

export interface ParamProps {
    name: string;
    personId: string;
}
export interface ListItemProps {
    id: number;
    name: string;
    personId: number;
    organization: string;
    pin: boolean;
    created: number;
}
export interface UserProps {
    name: string;
    id: number;
    email: string;
    title: string;
    organization: string;
    token: string;
}

const ProjectList = () => {
    const [, setParam] = useState<ParamProps>({
        name: '',
        personId: '1'
    })
    // 基本类型，组件状态 可以放到依赖里
    // 非组件状态的对象 不能放到依赖里
    // https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js
    const [param] = useUrlQueryParam(['name', 'personId'])
    const debouncedValue = useDebounce(param, 200)
    const { users } = useUserList()
    const { isError, isLoading, error, list } = useProjectList(debouncedValue)

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel
                users={users || []}
                param={param}
                setParam={setParam}
            />
            {isError ? error?.message : null}
            <List
                loading={isLoading}
                dataSource={list || []}
                users={users|| []}
            />
        </Container>
    )
}

const Container = styled.div`
padding: 3.2rem;
`

ProjectList.whyDidYouRender = true

export default ProjectList