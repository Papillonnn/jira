import React, { useEffect } from 'react';
import { Drawer, Spin, Form, Input, Button } from 'antd';
import { useProjectModal } from './utils';
import UserSelect from 'components/UserSelect';
import { useUserList } from 'hooks/useUserList';
import { useAddProject, useEditProject } from 'hooks/project';
import { useForm } from 'antd/lib/form/Form';
import { ErrorBox } from 'components/lib';
import styled from '@emotion/styled';

const ProjectModal = () => {
    const { projectModalOpen, close, editingProject, isLoading } = useProjectModal()
    const { users } = useUserList()
    const title = editingProject ? '编辑项目' : '创建项目'
    const useMutateProject = editingProject ? useEditProject : useAddProject
    const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject()
    const [form] = useForm()
    const onFinish = (values: any) => {
        mutateAsync({...editingProject, ...values}).then(() => {
            form.resetFields()
            close()
        })
    }

    useEffect(() => {
        form.setFieldsValue(editingProject)
    }, [editingProject, form])
    return <Drawer
        forceRender={true}
        width={'100%'}
        visible={projectModalOpen}
        onClose={close}
    >
        {
            isLoading ? <Spin size='large' /> : <Container>
                <h1>{title}</h1>
                <ErrorBox error={error} />
                <Form
                    form={form}
                    layout='vertical'
                    style={{ width: '40rem' }}
                    onFinish={onFinish}
                >
                    <Form.Item label='名称' name='name' rules={[{required: true, message: '请输入项目名称'}]}>
                        <Input placeholder='请输入项目名称'/>
                    </Form.Item>
                    <Form.Item label='部门' name='organization' rules={[{required: true, message: '请输入部门名称'}]}>
                        <Input placeholder='请输入部门名称'/>
                    </Form.Item>
                    <Form.Item label='负责人' name='personId'>
                        <UserSelect
                            users={users || []}
                            defaultOptionName='负责人'
                        />
                    </Form.Item>
                    <Form.Item style={{textAlign: 'center'}}>
                        <Button loading={mutateLoading} type='primary' htmlType='submit'>提交</Button>
                    </Form.Item>
                </Form>
            </Container>
        }
    </Drawer>
}

const Container = styled.div`
display: flex;
flex-direction:column;
justify-content: center;
align-items: center;
`

export default ProjectModal