import React from 'react';
import { Link } from 'react-router-dom'
import { Dropdown, Menu, Table } from 'antd';
import { ListItemProps, UserProps } from '.';
import { ColumnsType, TableProps } from 'antd/lib/table';
import dayjs from 'dayjs';
import Pin from 'components/Pin';
import { useEditProject } from 'hooks/project';
import { ButtonNoPadding } from 'components/lib';
import { useProjectModal } from './utils';

interface ListProps extends TableProps<ListItemProps> {
    users: UserProps[];
}

const List: React.FC<ListProps> = ({ users, ...props }) => {
    const { mutate } = useEditProject()
    const { open } = useProjectModal()
    // const mutatePin = (id: number, pin: boolean) => mutate({id, pin})
    // js函数柯里化
    const mutatePin = (id: number) => (pin: boolean) => mutate({ id, pin })
    const { startEdit } = useProjectModal()
    const editProject = (id: number) => startEdit(id)
    const colums: ColumnsType<ListItemProps> | undefined = [{
        title: <Pin checked={true} disabled={true}></Pin>,
        render(value, listItem) {
            // return <Pin checked={listItem.pin} onCheckedChange={pin => mutatePin(listItem.id, pin)}></Pin>
            return <Pin checked={listItem.pin} onCheckedChange={mutatePin(listItem.id)}></Pin>
        }
    },{
        title: '名称',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render(value, listItem) { 
            return <Link to={listItem.id.toString()}> { listItem.name }</Link>
        }
    }, {
        title: '部门',
        dataIndex: 'organization'
    }, {
        title: '负责人',
        render(value, listItem) {
            return <span key={value}>
                {users.find(user => user.id === listItem.personId)?.name || '未知'}
            </span>
        }
        }, {
        title: '创建时间',
        render(value, listItem) {
            return <span key={value}>
                {listItem.created ? dayjs(listItem.created).format('YYYY-MM-DD'):'无'}
            </span>
        }
    }, {
        render(value, listItem) {
            return <Dropdown overlay={
                <Menu>
                    <Menu.Item key={'edit'} onClick={() => editProject(listItem.id)}>编辑</Menu.Item>
                    <Menu.Item key={'delete'} onClick={open}>删除</Menu.Item>
                </Menu>
            }>
                <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
            </Dropdown>
        }
    }]
    return (
        <Table
            pagination={false}
            columns={colums}
            rowKey={item => item.id}
            {...props}
        ></Table>
    )
}

export default List