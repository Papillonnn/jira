import React from 'react';
import styled from '@emotion/styled';
import { Popover, Typography, List, Divider } from 'antd';
import { useProjectList } from 'hooks/project';
import { ButtonNoPadding } from './lib';
import { useProjectModal } from 'screens/ProjectList/utils';

const ProjectPopover = () => {
    const { open } = useProjectModal()
    const { data: projects } = useProjectList()
    const pinedPorjects = projects?.filter(project => project.pin)

    const content = <ContentContainer>
        <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
        <List>
            {pinedPorjects?.map(item => (
                <List.Item key={item.id}>
                    <List.Item.Meta title={item.name}/>
                </List.Item>
            ))}
        </List>
        <Divider />
        <ButtonNoPadding
            type={'link'}
            onClick={open}
        >创建项目</ButtonNoPadding>
    </ContentContainer>
    return (
        <Popover
            placement={'bottom'}
            content={content}
        >
            项目
        </Popover>
    )
}

const ContentContainer = styled.div`
min-width: 30rem;
`

export default ProjectPopover