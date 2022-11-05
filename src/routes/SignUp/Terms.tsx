import React from 'react';
import { Link } from 'react-router-dom';
import CSS from 'csstype';
import styled from 'styled-components'
import { FlexColumn } from '../../components/utils/UsefulDiv';

const margin = 40;
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
const Term = styled.a`
    margin-right: auto;
    margin-left: 20%;
    padding-bottom: 10px;
    color: blue;
    font-size: 19px;
    font-weight: 700;
`
const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 60vw;
    justify-content: flex-start;
    padding-bottom: 15px;
`
const InputInner = styled.div`
    display: flex;
    flex-direction: row;
    height: 1.5vw;
    justify-content: center;
    margin-left: 20%;
    align-items: center;
`
const InputGuide = styled.span`
    color: grey;
    margin-left: 10px;
    font-size: 13px;
    line-height: 1.5vw;
`
const Input = styled.input`
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    width: 1vw;
    height: 1.5vw;
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
type TermsProps = {
    history: any,
    location: any,
}

type TermsState = {
    agreed: boolean,
}

class Terms extends React.Component<TermsProps, TermsState> {
    constructor(props: TermsProps) {
        super(props);
        this.state = {
            agreed: false,
        }
    }

    handleSubmit = async (event: any) => {
        event.preventDefault();
        if (this.state.agreed) {
            window.location.href = "/#/signup/select"
        }
        else {
            window.alert("서비스 이용 약관 및 개인정보 수집 및 활용 약관에 동의하지 않으셨습니다.")
        }
    }

    handleChange = async (event: any) => {
        this.setState({
            agreed: event.target.checked
        })
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
                                src='https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/source/whiteArrow.png'
                            />
                            <p>Back</p>
                        </Back>
                        <DescriptionContainer>
                            <img
                                src='https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/source/signUpChar.png'
                                style={this.imgStyle}
                            />
                            <Title>Sign Up to Join!</Title>
                            <Explanation>NUS 한인회 사이트에 가입하시고 승인 받으시면 게시판의 더 많은 정보에 접속할 수 있습니다.</Explanation>
                        </DescriptionContainer>
                    </FlexColumn>
                    <Form onSubmit={this.handleSubmit}>
                        <Term target="_blank" href="https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/NUS+KS+Privacy+Policy+%2B+Terms+of+Service-1.docx.pdf" rel="noopener noreferrer">이용약관 전문 보기</Term>
                        <InputContainer>
                            <InputInner>
                                <Input
                                    name="agree"
                                    type="checkbox"
                                    value={'TermsAndConditionAgree'}
                                    defaultChecked={false}
                                    onChange={this.handleChange}
                                />
                                <InputGuide>서비스 이용 약관, 개인정보 수집 및 활용 약관에 동의합니다 / I agree with Terms of Service and Privacy Policy</InputGuide>
                            </InputInner>
                        </InputContainer>

                        {/* Will be adding name, nickname, etc. */}
                        <SubmitButton type="submit" value="Continue" />
                        <ToSignIn to="/signin" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>계정이 이미 있으신가요? 여길 눌러 로그인하세요!</ToSignIn>
                    </Form>
                </Container>
            </>
        )
    }
}

export default Terms;