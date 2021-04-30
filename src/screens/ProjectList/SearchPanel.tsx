import React from 'react';
import { ParamProps, UserProps } from '.';
import { Input, Select, Form } from 'antd';

export interface SearchPanelProps {
    param: ParamProps;
    users: UserProps[];
    setParam: (param: ParamProps) => void
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
                <Select value={param.personId} onChange={value => setParam({
                    ...param,
                    personId: value
                })}>
                    <Select.Option value="">负责人</Select.Option>
                    {users.map(user => <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>)}
                </Select>
            </Form.Item>
        </Form>
    )
}

export default SearchPanel