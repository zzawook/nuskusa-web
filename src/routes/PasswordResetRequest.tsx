import React from 'react';
import styled from 'styled-components';
import { authService, dbService } from '../utils/firebaseFunctions';
import CSS from 'csstype';

type PasswordResetRequestState = {
    email: string
}


const height = window.innerHeight;
const width = window.innerWidth;
const margin = 15;

class PasswordResetRequest extends React.Component<{}, PasswordResetRequestState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
        }
    }

    handleResetClick = async () => {
        const userDocs = (await dbService.collection("users").where("email", "==", this.state.email).get()).docs
        if (userDocs.length == 0) {
            alert('This email does not exist!');
            return;
        } else {
            authService.sendPasswordResetEmail(this.state.email)
            .then(function () {
                alert('We will send an email to you soon!')
            })
        }
    }

    handleChange = (event: any) => {
        if (event.target.name === 'email') {
            this.setState({
                email: event.target.value
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
        `
        const EmailInput = styled.input`
            position: absolute;
            left: 20%;
            top: ${(height * 0.1) + (10 * margin) + 150}px;
            border: none;
            border-bottom: 2px solid rgba(0, 0, 0, 0.3);
            width: 60%;
            height: 45px;
            font-family: var(--font-family-roboto);
            font-weight: 700;
            font-size: 18px;
            outline: none;
        `
        const ToSignUp = styled.a`
            position: absolute;
            left: 20%;
            top: ${(height * 0.1) + (26 * margin) + 110}px;
            width: 60%;
            color: #808080;
            font-size: 12px;
            font-weight: 700;
        `

        const SubmitButton = styled.input`
            position: absolute;
            right: 20%;
            top: ${(height * 0.1) + (26 * margin)}px;
            width: 60%;
            height: 63px;
            border: none;
            background-color: #BDA06D;
            color: white;
            font-weight: 700;
            font-size: 18px;
            font-family: var(--font-family-roboto);
            cursor: pointer;
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
        return (
            <>
                <Container>
                    <Back onClick={this.handleBackClick}><img style={this.arrowStyle} src='https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FwhiteArrow.png?alt=media&token=efa6ec9b-d260-464e-bf3a-77a73193055f' />Back</Back>
                    <Title>Reset Password</Title>
                    <Explanation>이메일을 제출해주시면 비밀번호 변경 관련 이메일이 전송됩니다.</Explanation>
                    <img src='https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2F8.png?alt=media&token=21e952d4-00f1-4a92-b0d2-28868e45e64f' style={this.imgStyle} />
                </Container>
                <Form onSubmit={this.handleResetClick}>
                    <EmailInput
                        name="email"
                        type="email"
                        placeholder="이메일 / Email"
                        required
                        value={this.state.email}
                        onChange={this.handleChange}
                    ></EmailInput>
                    <ToSignUp href="/#/signup" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>Don't have an account? Click here to create an account!</ToSignUp>
                    <SubmitButton type="submit" value="Submit" />
                </Form>
            </>
        )
    }
}

export default PasswordResetRequest;