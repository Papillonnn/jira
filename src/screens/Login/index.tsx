import React, { useState } from 'react';
import { Button, Card, Divider, Typography } from 'antd';
// import { Helmet } from 'react-helmet'
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import styled from '@emotion/styled';
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'
import { ErrorBox } from 'components/lib';

const LoginScreen = () => {
    const [isRegister, setIsRegister] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    return (
        <Container>
            {/* <Helmet>
                <title>请登录或注册以继续</title>
            </Helmet> */}
            <Header />
            <Background />
            <ShadowCard>
                <Title>
                    {isRegister ? '请登录' : '请注册'}
                </Title>
                <ErrorBox error={error} />
                {isRegister ? <LoginComponent onError={setError} /> : <RegisterComponent onError={setError} />}
                <Divider />
                <Toggle
                    onClick={() => setIsRegister(!isRegister)}
                >{isRegister ? '注册新账号' : '已经有账号了？直接登录'}</Toggle>
            </ShadowCard>
        </Container>
    )
}

const Header = styled.header`
background: url(${logo}) no-repeat center;
padding: 5rem 0;
background-size: 8rem;
width: 100%;
`

const Background = styled.div`
position: absolute;
width: 100%;
height: 100%;
background-repeat: no-repeat;
background-attachment: fixed;
background-position: left bottom, right bottom;
background-size: calc(((100vw - 40rem)/2) - 3.2rem), calc(((100vw - 40rem)/2) - 3.2rem), cover;
background-image: url(${left}), url(${right});
`

const Title = styled.h2`
margin-bottom: 2.4rem;
color: rgb(94, 108, 132);
`

const Container = styled.div`
display: flex;
flex-direction: column;
align-items :center;
min-height: 100vh;
`

const ShadowCard = styled(Card)`
width: 40rem;
min-height: 56rem;
padding: 3.2rem 3rem;
border-radius: 0.3rem;
box-sizing: border-box;
box-shadow: rgba(0,0,0,.1) 0 0 1rem;
text-align: center;
`

const Toggle = styled.span`
color: #0051ff;
font-size: 1.4rem;
cursor: pointer;
`

export const LongButton = styled(Button)`
width: 100%;
`

export default LoginScreen