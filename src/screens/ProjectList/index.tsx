import React from 'react';
import List from './List';
import SearchPanel from './SearchPanel';
import { useDebounce } from 'utils';
import styled from '@emotion/styled';
import { useProjectList } from 'hooks/project';
import { useUserList } from 'hooks/useUserList';
import { useProjectModal, useProjectSearchParams } from './utils';
import { ErrorBox, Row } from 'components/lib';
import { Button } from 'antd';

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
    // 基本类型，组件状态 可以放到依赖里
    // 非组件状态的对象 不能放到依赖里
    // https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js
    const [param, setParam] = useProjectSearchParams()
    const { open } = useProjectModal()
    const debouncedValue = useDebounce(param, 200)
    const { users } = useUserList()
    const { isLoading, error, data: list } = useProjectList(debouncedValue)

    return (
        <Container>
            <Row between={true}>
                <h1>项目列表</h1>
                <Button onClick={open}>创建项目</Button>
            </Row>
            <SearchPanel    
                users={users || []}
                param={param}
                setParam={setParam}
            />
            <ErrorBox error={error} />
            <List
                loading={isLoading}
                dataSource={list || []}
                users={users || []}
                // retry={retry}
            />
        </Container>
    )
}

const Container = styled.div`
padding: 3.2rem;
`

ProjectList.whyDidYouRender = false

export default ProjectList