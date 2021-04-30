import React from 'react';
import { Link } from 'react-router-dom'
import { Table } from 'antd';
import { ListItemProps, UserProps } from '.';
import { ColumnsType, TableProps } from 'antd/lib/table';
import dayjs from 'dayjs';

interface ListProps extends TableProps<ListItemProps> {
    users: UserProps[]
}

const List: React.FC<ListProps> = ({ users, ...props }) => {
    const colums: ColumnsType<ListItemProps> | undefined = [{
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