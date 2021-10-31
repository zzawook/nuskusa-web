import React from 'react';
import { Link } from 'react-router-dom';
import CSS from 'csstype';
import Navbar from '../components/Navbar';
import { authService, dbService } from '../utils/firebaseFunctions';
import styled from 'styled-components'
import { SampleUser } from '../utils/SampleUser';

type UserProps = {
    
}

type UserState = {
    email: string,
    password: string,
    fullName: string
}

const height = window.innerHeight;
const width = window.innerWidth;
const margin = 15;
let linkMouseEnter = false;

const Container = styled.div`
    position: absolute;
    left: 0%;
    top: 0%;
    width: 40%;
    height: 100%;
    background-color: #0B121C;
`
const Back = styled.button`
    position: absolute;
    left: 25%;
    top: 10%;
    width: 95px;
    height: 41px;
    border: 2px solid white;
    color: #969696;
    background-color: #0B121C;
    font-weight: 500;
    padding-left: 30px;
    cursor: pointer;
`
const Title = styled.span`
    position: absolute;
    left: 25%;
    top: 70%;
    width: 50%;
    text-align: center;
    font-weight: 700;
    font-family: var(--font-family-roboto);
    color: white;
    font-size: 40px;
    z-index: 1;
`
const Explanation = styled.span`
    position: absolute;
    left: 25%;
    width: 50%;
    text-align: center;
    top: ${(height * 0.7) + 60}px;
    font-weight: 800;
    font-size: 13px;
    color: #808080;
    z-index: 1;
`
const Form = styled.form`
    position: absolute;
    right: 0%;
    top: 0%;
    width: 60%;
    height: 100%;
    background-color: white;
    z-index: 0; 
`
const NameInput = styled.input`
    position: absolute;
    left: 20%;
    top: ${(height * 0.1) + (8 * margin)}px;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    width: 60%;
    height: 45px;
    font-family: var(--font-family-roboto);
    font-weight: 700;
    font-size: 18px;
    outline: none;
`
const EmailInput = styled.input`
    position: absolute;
    left: 20%;
    top: ${(height * 0.1) + (15 * margin)}px;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    width: 60%;
    height: 45px;
    font-family: var(--font-family-roboto);
    font-weight: 700;
    font-size: 18px;
    outline: none;
`
const PasswordInput = styled.input`
    position: absolute;
    left: 20%;
    top: ${(height * 0.1) + (22 * margin)}px;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    width: 60%;
    height: 45px;
    font-family: var(--font-family-roboto);
    font-weight: 700;
    font-size: 18px;
    outline: none;
`
const SubmitButton = styled.input`
    position: absolute;
    right: 20%;
    bottom: 20%;
    width: 60%;
    height: 63px;
    border: none;
    background-color: #BDA06D;
    color: white;
    font-weight: 700;
    font-size: 22px;
    font-family: var(--font-family-roboto);
    cursor: pointer;
`
const ToSignIn = styled.a`
    position: absolute;
    left: 20%;
    bottom: 15%;
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
            fullName: '',
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
        else if (event.target.name === 'fullName') {
            this.setState({
                fullName: value
            })
        }
    }

    handleSubmit = async (event: any) => {
        event.preventDefault();
        await authService.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(async (userCredential) => {
                const userObject = {
                    email: this.state.email,
                    fullName: this.state.fullName,
                    isVerified: false,
                    role: 'User'
                }
                await dbService.collection('users').doc(userCredential.user?.uid).set(userObject);
            })
            .catch((error) => {
                console.error(error);
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
    handleSigninClick = (e: any) => {
        e.preventDefault();

    }
    arrowStyle: CSS.Properties = {
        position: "absolute",
        left: "8px",
        top: "8px",
        height: '20px',
    }
    imgStyle: CSS.Properties = {
        position: 'absolute',
        left: '20%',
        width: '60%',
        top: '20%'
    }
    render() {
        

        return (
            <>
                <Container>
                    <Back onClick={this.handleBackClick}><img style={this.arrowStyle} src='https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FwhiteArrow.png?alt=media&token=efa6ec9b-d260-464e-bf3a-77a73193055f'/>Back</Back>
                    <Title>Sign Up to Join!</Title>
                    <Explanation>NUS 한인회 사이트에 가입하시고 승인 받으시면 게시판의 더 많은 정보에 접속할 수 있습니다.</Explanation>
                    <img src='https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2F8.png?alt=media&token=21e952d4-00f1-4a92-b0d2-28868e45e64f' style={this.imgStyle}/>
                </Container>
                <Form onSubmit={this.handleSubmit}>
                    <NameInput
                        name="fullName"
                        type="string"
                        placeholder="이름 (영어로, 성 먼저) / Name (Last name first)"
                        required
                        value={this.state.fullName}
                        onChange={this.handleChange}
                    >
                    </NameInput>
                    <EmailInput
                        name="email"
                        type="email"
                        placeholder="이메일 / Email"
                        required
                        value={this.state.email}
                        onChange={this.handleChange}
                    ></EmailInput>
                    <PasswordInput
                        name="password"
                        type="password"
                        placeholder="비밀번호 / Password"
                        required
                        value={this.state.password}
                        onChange={this.handleChange}
                    ></PasswordInput>
                    
                    {/* Will be adding name, nickname, etc. */}
                    <SubmitButton type="submit" value="Submit"/>
                    <ToSignIn href="/signin" onClick={this.handleSigninClick} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>Already have an account? Click here to Log in.</ToSignIn>
                </Form>
            </>
        )
    }
}

export default SignUp;