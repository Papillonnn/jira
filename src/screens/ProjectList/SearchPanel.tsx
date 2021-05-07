import React from 'react';
import { ListItemProps, UserProps } from '.';
import { Input, Form } from 'antd';
import UserSelect from 'components/UserSelect';

export interface SearchPanelProps {
    param: Partial<Pick<ListItemProps, 'name' | 'personId'>>;
    users: UserProps[];
    setParam: (param: SearchPanelProps['param']) => void
}

const SearchPanel: React.FC<SearchPanelProps> = (props) => {
    const { param, setParam, users } = props

    return (
        <Form style={{marginBottom: '2rem'}} layout='inline'>
            <Form.Item>
                <Input
                    type="text"
                    value={param.name}
                    onChange={e => setParam({
                        ...param,
                        name: e.target.value
                    })} />
            </Form.Item>
            <Form.Item>
                <UserSelect
                    defaultOptionName={'负责人'}
                    users={users}
                    value={param.personId}
                    onChange={value => {setParam({
                        ...param,
                        personId: value
                    })}}
                ></UserSelect>
                {/* <Select value={param.personId} onChange={value => {setParam({
                    ...param,
                    personId: value
                })}}>
                    <Select.Option value="">负责人</Select.Option>
                    {users.map(user => <Select.Option key={user.id} value={user.id.toString()}>{user.name}</Select.Option>)}
                </Select> */}
            </Form.Item>
        </Form>
    )
}

export default SearchPanel