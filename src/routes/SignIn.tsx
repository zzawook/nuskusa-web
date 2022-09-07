import React from 'react';
import { Link } from 'react-router-dom';
import { authService, dbService } from '../utils/firebaseFunctions';
import firebase from 'firebase';
import styled from 'styled-components';
import CSS from 'csstype';
import { FlexColumn } from '../components/utils/UsefulDiv';
import crypto from 'crypto-js'
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';

type UserProps = {
    history: any,
    location: any,
    match: any,
    onSignIn: Function,
}

type UserObject = {
    email: string,
    password: string,
    failed: boolean,
    loading: boolean,
}

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
const ToSignUp = styled(Link)`
    width: 60%;
    color: #808080;
    margin-bottom: ${margin}px;
    font-size: 12px;
    font-weight: 700;
`
const ToPassWord = styled(Link)`
    width: 60%;
    color: #808080;
    margin-bottom: ${margin}px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
`
const FailMessage = styled.span`
    color: red;
`
const LoadingBlocker = styled.div`
    opacity: 0.5;
    background-color: black;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const LoadingText = styled.span`
    background-color: black;
    color: white;
    font-size: 16px;
    font-weight: 600;
`
class SignIn extends React.Component<UserProps, UserObject> {
    constructor(props: UserProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            failed: false,
            loading: false,
        }
    }
    handleChange = (event: any) => {
        if (event.target.name === 'email') {
            this.setState({
                email: event.target.value
            })
        }
        else if (event.target.name === 'password') {
            this.setState({
                password: event.target.value
            })
        }
    }

    handleSubmit = async (event: any) => {
        event.preventDefault();
        this.setState({
            loading: true,
        })
        const url = process.env.REACT_APP_HOST + "/api/auth/signin";
        const hashedPassword = crypto.SHA512(this.state.password).toString();
        const credentialObject = {
            email: this.state.email,
            password: hashedPassword
        }
        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(credentialObject),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            //SIGN IN SUCCES
            if (response.status == 200) {
                this.setState({
                    loading: false,
                })
                const userdata = await response.json();
                console.log(userdata)
                this.props.onSignIn(userdata);
                this.props.history.push("/");
            }
            //IF USER PASSWORD IS NOT IN AWS SERVER
            else if (response.status == 501) {
                authService.signInWithEmailAndPassword(this.state.email, this.state.password).then(async () => {
                    const pwUrl = process.env.REACT_APP_HOST + "/api/auth/updateAuthPassword";
                    const tempResponse = await fetch(pwUrl, {
                        method: "POST",
                        body: JSON.stringify({
                            email: this.state.email,
                            password: hashedPassword,
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    authService.signOut()
                    if (tempResponse.status == 200) {
                        const userdata = await tempResponse.json();
                        this.props.onSignIn(userdata);
                        this.setState({
                            loading: false,
                        })
                        this.props.history.push("/");
                    }
                    else {
                        this.setState({
                            failed: true,
                            loading: false,
                        })
                    }
                }).catch(err => {
                    this.setState({
                        failed: true,
                        loading: false,
                    })
                })
            }
            //SIGN IN FAILED DUE TO KNOWN REASON
            else if (response.status == 400) {
                const body = await response.text()
                if (body == "Email Not Verified") {
                    window.alert("이메일이 인증되지 않았습니다. 보내드린 인증 메일의 링크를 눌러 본인 인증을 완료해주세요.")
                    this.setState({
                        loading: false,
                    })
                    authService.signOut();
                }
                else if (body == "Account Not Verified") {
                    window.alert("제출해주신 문서를 검증하고 있습니다. 1~2일 내로 완료될 예정입니다. 조금만 기다려주세요!")
                    this.setState({
                        loading: false,
                    })
                    authService.signOut();
                }
                else {
                    window.alert("알 수 없는 오류가 발생했습니다. 홈페이지 하단의 Contact Us를 통해 문의해주세요.")
                }
            }
            //SIGN IN FAILED DUE TO INVALID CREDENTIAL
            else {
                this.setState({
                    failed: true,
                    loading: false,
                })
            }
        }
        catch (error) {
            this.setState({
                failed: true,
                loading: false,
            })
            console.log(error)
        }
    }

    handleMouseEnter = (e: any) => {
        e.preventDefault();
        e.target.style.textDecoration = 'underline';
    }
    handleMouseLeave = (e: any) => {
        e.preventDefault();
        e.target.style.textDecoration = 'none';
    }
    handleBackClick = (event: any) => {
        event.preventDefault();
        window.history.back();
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
                {this.state.loading ? <LoadingBlocker><LoadingText>거의 다 됐어요! 조금만 기다려주세요 :)</LoadingText></LoadingBlocker> : <></>}
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
                            <Title>Log In</Title>
                            <Explanation>환영합니다! 기존 이메일로 로그인 할 수 있습니다.</Explanation>
                        </DescriptionContainer>
                    </FlexColumn>
                    <Form onSubmit={this.handleSubmit}>
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
                        />
                        {/* Will be adding name, nickname, etc. */}
                        {this.state.failed ? <FailMessage>Login failed. Please check your ID and Password.</FailMessage> : <></>}
                        <ToPassWord to='/reset' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>Forgot Password?</ToPassWord>
                        <ToSignUp to='/signup' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>Don't have an account? Click here to create an account!</ToSignUp>
                        <SubmitButton type="submit" value="Submit" />
                    </Form>
                </Container>
            </>
        )
    }
}

export default SignIn;