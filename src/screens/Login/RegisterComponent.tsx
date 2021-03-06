import React from 'react';
import { LoginParamsProps, useLogin } from 'context/LoginContext';
import { Form, Input } from 'antd'
import { LongButton } from '.';

const RegisterComponent = ({ onError }: { onError: (error: Error) => void }) => {
    const { register } = useLogin()
    const handleSubmit = async (values: LoginParamsProps) => {
        try {
            register(values)
        } catch (error) {
            onError(error)
        }
    }
  
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item
                name='username'
                rules={[{required: true, message: '请输入用户名'}]}
            >
                <Input placeholder='用户名' type="text" id="username"/>
            </Form.Item>
            <Form.Item
                name='password'
                rules={[{required: true, message: '请输入密码'}]}
            >
                <Input placeholder='密码' type="password" id="password"/>
            </Form.Item>
            <Form.Item>
                <LongButton htmlType='submit' type='primary'>注册</LongButton>
            </Form.Item>
        </Form>
    )
}

export default RegisterComponent