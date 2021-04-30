import React from 'react'
import { Button, Dropdown, Menu } from 'antd'
import styled from '@emotion/styled'
import { Routes, Route, Navigate } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import ProjectList from 'screens/ProjectList'
import ProjectScreen from 'screens/Project'
import { useLogin } from 'context/LoginContext'
import { Row } from 'components/lib'
import { resetRoute, useDocumentTitle } from 'utils'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'


const HomeScreen = () => {
    
    return (
        <Container>
            <PageHeader />
            <Main>
                <Router>
                    <Routes>
                        <Route path={'/projects'} element={<ProjectList />}></Route>
                        <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
                        <Navigate to={'/projects'}/>
                    </Routes>
                </Router>
            </Main>
        </Container>
    )
}

const PageHeader = () => {
    const { logout, user } = useLogin()
    useDocumentTitle('项目列表', false)
    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <Button type='link' onClick={resetRoute}>
                    <SoftwareLogo
                        width={'18rem'}
                        color={'rgb(38, 132, 255)'}
                    ></SoftwareLogo>
                </Button>
                <h3>项目</h3>
                <h3>用户</h3>
            </HeaderLeft>
            <HeaderRight>
                <Dropdown
                    overlay={<Menu>
                        <Menu.Item key='logout'>
                            <Button onClick={() => logout()} type='link'>登出</Button>
                        </Menu.Item>
                    </Menu>}
                >
                    <Button onClick={e => e.preventDefault()} type='link'>Hi，{user?.name}</Button>
                </Dropdown>
            </HeaderRight>
        </Header>
    )
}

const Container = styled.div`
display: grid;
grid-template-rows: 6rem 1fr;
height: 100vh;
`

const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px rgba(0,0,0,.1);
z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.header``

const Main = styled.main`
height: calc(100vh -6rem);
`

export default HomeScreen