import React from 'react';
import styled from 'styled-components';
import CSS from 'csstype';

const height = window.innerHeight;

const Container = styled.div`
        position: absolute;
        left: 0%;
        top: 0%;
        width: 40%;
        height: 100%;
        background-color: #0B121C;
    `
const Form = styled.form`
            position: absolute;
            right: 0%;
            top: 0%;
            width: 60%;
            height: 100%;
            background-color: white;
            z-index: 0; 
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        `
const Input = styled.input`
            border: none;
            border-bottom: 2px solid rgba(0, 0, 0, 0.3);
            width: 60%;
            height: 45px;
            font-family: var(--font-family-roboto);
            font-weight: 700;
            font-size: 18px;
            outline: none;
            margin-bottom: 30px;
        `
const ToSignUp = styled.a`
            width: 60%;
            color: #808080;
            font-size: 12px;
            font-weight: 700;
            margin-top: 20px;
            margin-bottom: 20px;
        `

const SubmitButton = styled.input`
            width: 60%;
            height: 63px;
            border: none;
            background-color: #BDA06D;
            color: white;
            font-weight: 700;
            font-size: 18px;
            font-family: var(--font-family-roboto);
            cursor: pointer;
            margin-top: 20px;
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
            left: 12.5%;
            top: 70%;
            width: 75%;
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
const LoadingBlocker = styled.div`
    opacity: 0.5;
    background-color: black;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 11;
`
const LoadingText = styled.span`
    background-color: black;
    color: white;
    font-size: 16px;
    font-weight: 600;
`

type PasswordResetRequestState = {
    email: string,
    name: string,
    yearOfBirth: string,
    loading: boolean
}

class PasswordResetRequest extends React.Component<{}, PasswordResetRequestState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            name: "",
            yearOfBirth: "",
            loading: false
        }
    }

    handleResetClick = async (event: any) => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        
        const url = process.env.REACT_APP_HOST + "/api/auth/findPassword/"
        const body = {
            name: this.state.name,
            yearOfBirth: this.state.yearOfBirth,
            email: this.state.email,
        }
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status == 200) {
            this.setState({
                loading: false
            })
            alert('비밀번호 재설정 메일을 보내드렸습니다. Password Reset Email has been sent.')
        }
        else if (response.status == 404) {
            this.setState({
                loading: false
            })
            alert('계정이 존재하지 않습니다. Account with given email does not exist.');
        }
        else if (response.status == 401) {
            this.setState({
                loading: false
            })
            alert("이메일과 입력하신 정보가 맞지 않습니다. The information you provided does not match that of account in our database.")
        }
        else {
            this.setState({
                loading: false
            })
            alert("비밀번호 재설정 요청을 알 수 없는 이유로 처리할 수 없습니다. 다시 시도해보거나 한인회에 연락해주세요.")
        }
    }

    handleChange = (event: any) => {
        event.preventDefault();
        if (event.target.name === 'email') {
            this.setState({
                email: event.target.value
            })
        }
        if (event.target.name === "name") {
            this.setState({
                name: event.target.value
            })
        }
        if (event.target.name === "yearOfBirth") {
            this.setState({
                yearOfBirth: event.target.value
            })
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
    handleBackClick = (event: any) => {
        event.preventDefault();
        window.history.back();
    }
    render = () => {

        return (
            <>
                {this.state.loading ? <LoadingBlocker><LoadingText>거의 다 됐어요! 조금만 기다려주세요 :)</LoadingText></LoadingBlocker> : <></>}
                <Container>
                    <Back onClick={this.handleBackClick}><img style={this.arrowStyle} src='https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/source/whiteArrow.png' />Back</Back>
                    <Title>Reset Password</Title>
                    <Explanation>이메일을 제출해주시면 비밀번호 변경 관련 이메일이 전송됩니다.</Explanation>
                    <img src='https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/source/signUpChar.png' style={this.imgStyle} />
                </Container>
                <Form onSubmit={this.handleResetClick}>
                    <Input
                        name="email"
                        type="email"
                        placeholder="이메일 / Email"
                        required
                        value={this.state.email}
                        onChange={this.handleChange}
                    ></Input>
                    <Input
                        name="name"
                        type="text"
                        placeholder="한글 이름 / Name in Korean"
                        required
                        value={this.state.name}
                        onChange={this.handleChange}
                    ></Input>
                    <Input
                        name="yearOfBirth"
                        type="text"
                        placeholder="출생 연도 / Year of Birth (ex. 2002)"
                        required
                        value={this.state.yearOfBirth}
                        onChange={this.handleChange}
                    ></Input>
                    <ToSignUp href="/#/signup" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>Don't have an account? Click here to create an account!</ToSignUp>
                    <SubmitButton type="submit" value="Submit" />
                </Form>
            </>
        )
    }
}

export default PasswordResetRequest;