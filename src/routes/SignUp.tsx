import React from 'react';
import { Link } from 'react-router-dom';
import CSS from 'csstype';
import { authService, dbService } from '../utils/firebaseFunctions';
import styled from 'styled-components'
import { FlexColumn } from '../components/util/UsefulDiv';

type UserProps = {
    history: any,
    location: any,
}

type UserState = {
    email: string,
    password: string,
    username: string
}

const height = window.innerHeight;
const width = window.innerWidth;
const margin = 20;
let linkMouseEnter = false;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 100vh;
    align-items: center;
    background-color: #0B121C;
`
const DescriptionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 40vw;
    background-color: #0B121C;
`

const Back = styled.button`
    position: absolute;
    display: flex;
    top: 25px;
    left: 25px;
    width: 95px;
    height: 50px;
    border: 2px solid white;
    color: #969696;
    background-color: #0B121C;
    font-weight: 500;
    cursor: pointer;
`
const Title = styled.span`
    width: 50%;
    text-align: center;
    margin-bottom: ${margin}px;
    font-weight: 700;
    font-family: var(--font-family-roboto);
    color: white;
    font-size: 40px;
`
const Explanation = styled.span`
    text-align: center;
    font-weight: 800;
    font-size: 13px;
    color: #808080;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60vw;
    height: 100vh;
    background-color: white;
`

const Input = styled.input`
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    margin-bottom: ${margin}px;
    width: 60%;
    height: 45px;
    font-family: var(--font-family-roboto);
    font-weight: 700;
    font-size: 18px;
    outline: none;
`

const SubmitButton = styled.input`
    width: 60%;
    height: 63px;
    border: none;
    margin-bottom: ${margin}px;
    background-color: #BDA06D;
    color: white;
    font-weight: 700;
    font-size: 22px;
    font-family: var(--font-family-roboto);
    cursor: pointer;
`
const ToSignIn = styled(Link)`
    color: #808080;
    font-size: 12px;
    font-weight: 600;
    text-decoration: ${linkMouseEnter ? 'underline' : 'none'};
`
class SignUp extends React.Component<UserProps, UserState> {
    constructor(props: UserProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
        }
    }
    handleChange = (event: any) => {
        const value = event.target.value;
        if (event.target.name === 'email') {
            this.setState({
                email: value
            })
        }
        else if (event.target.name === 'password') {
            this.setState({
                password: value
            })
        }
        else if (event.target.name === 'username') {
            this.setState({
                username: value
            })
        }
    }

    handleSubmit = async (event: any) => {
        event.preventDefault();
        await authService.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(async (userCredential) => {
                const userObject = {
                    email: this.state.email,
                    username: this.state.username,
                    userId: userCredential.user?.uid,
                    isVerified: false,
                    role: 'User'
                }
                await dbService.collection('users').doc(userCredential.user?.uid).set(userObject);
                this.props.history.push("/")
            })
            .catch((error) => {
                console.error(error);
                window.alert("Sign up failed. Please try again later.")
            });
    }

    handleBackClick = (event: any) => {
        event.preventDefault();
        window.history.back();
    }
    handleMouseEnter = (e: any) => {
        e.preventDefault();
        e.target.style.textDecoration = 'underline';
    }
    handleMouseLeave = (e: any) => {
        e.preventDefault();
        e.target.style.textDecoration = 'none';
    }
    arrowStyle: CSS.Properties = {
        height: '15px',
        marginTop: '14px',
        marginRight: '10px',
    }
    imgStyle: CSS.Properties = {
        width: '60%',
    }

    render() {
        return (
            <>
                <Container>
                    <FlexColumn>
                        <Back onClick={this.handleBackClick}>
                            <img
                                style={this.arrowStyle}
                                src='https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FwhiteArrow.png?alt=media&token=efa6ec9b-d260-464e-bf3a-77a73193055f'
                            />
                            <p>Back</p>
                        </Back>
                        <DescriptionContainer>
                            <img
                                src='https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2F8.png?alt=media&token=21e952d4-00f1-4a92-b0d2-28868e45e64f'
                                style={this.imgStyle}
                            />
                            <Title>Sign Up to Join!</Title>
                            <Explanation>NUS 한인회 사이트에 가입하시고 승인 받으시면 게시판의 더 많은 정보에 접속할 수 있습니다.</Explanation>
                        </DescriptionContainer>
                    </FlexColumn>
                    <Form onSubmit={this.handleSubmit}>
                        <Input
                            name="username"
                            type="string"
                            placeholder="이름 (영어로, 성 먼저) / Name (Last name first)"
                            required
                            value={this.state.username}
                            onChange={this.handleChange}
                        >
                        </Input>
                        <Input
                            name="email"
                            type="email"
                            placeholder="이메일 / Email"
                            required
                            value={this.state.email}
                            onChange={this.handleChange}
                        ></Input>
                        <Input
                            name="password"
                            type="password"
                            placeholder="비밀번호 / Password"
                            required
                            value={this.state.password}
                            onChange={this.handleChange}
                        ></Input>

                        {/* Will be adding name, nickname, etc. */}
                        <SubmitButton type="submit" value="Submit" />
                        <ToSignIn to="/signin" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>Already have an account? Click here to Log in.</ToSignIn>
                    </Form>
                </Container>
            </>
        )
    }
}

export default SignUp;