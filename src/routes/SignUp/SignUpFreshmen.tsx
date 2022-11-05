import React from 'react';
import { Link } from 'react-router-dom';
import CSS from 'csstype';
import styled from 'styled-components'
import { FlexColumn } from '../../components/utils/UsefulDiv';
import crypto from "crypto-js"

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
const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 60vw;
    height: 85px;
    justify-content: center;
`
const InputMandatoryIndicator = styled.span`
    width: 10px;
    color: red;
    line-height: 45px;
`
const InputInner = styled.div`
    display: flex;
    flex-direction: column;
`
const InputGuide = styled.span`
    width: 36vw;
    color: grey;
    font-size: 11px;
`
const Input = styled.input`
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    width: 36vw;
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
const AddDoc = styled.div`
    width: 60%;
    height: 100px;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
`
const AddDocTitle = styled.span`
    color: black;
    font-size: 16px;
    font-weight: 600;
    margin-left: 15px;
`
const AddDocDiv = styled.div`
    display: flex;
    flex-direction: row;
    height: 40px;
`
const AddDocButton = styled.label`
    width: 100px;
    height: 40px;
    color: black;
    background-color: white;
    border: 1px solid black;
    line-height: 40px;
    text-align: center;
    margin-top: 15px;
    margin-left: 15px;
    margin-bottom: 15px;
    cursor: pointer;
`
const FileName = styled.span`
    color: black;
    line-height: 40px;
    margin-top: 15px;
    margin-left: 15px;
`
const ToSignIn = styled(Link)`
    color: #808080;
    font-size: 12px;
    font-weight: 600;
    text-decoration: ${linkMouseEnter ? 'underline' : 'none'};
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
type UserProps = {
    history: any,
    location: any,
}

type UserState = {
    email: string,
    password: string,
    name: string,
    major: string,
    gender: string,
    kakaoTalkId: string,
    fileSelected: File | undefined,
    loading: boolean,
    yearOfBirth: string,
}

class SignUp extends React.Component<UserProps, UserState> {
    constructor(props: UserProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            major: "",
            gender: "",
            kakaoTalkId: "",
            fileSelected: undefined,
            yearOfBirth: "",
            loading: false,
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
        else if (event.target.name === 'name') {
            this.setState({
                name: value
            })
        }
        else if (event.target.name == "major") {
            this.setState({
                major: value
            })
        }
        else if (event.target.name == "gender") {
            this.setState({
                gender: value
            })
        }
        else if (event.target.name == "yearOfBirth") {
            this.setState({
                yearOfBirth: value
            })
        }
        else if (event.target.name == "kakaoTalkId") {
            this.setState({
                kakaoTalkId: value
            })
        }
    }

    handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!this.state.fileSelected) {
            window.alert("합격 증명서를 첨부하지 않았습니다. 합격 증명서를 첨부해주세요.");
            return;
        }
        if (this.state.yearOfBirth.length != 4 && ! /^\d+$/.test(this.state.yearOfBirth)) {
            window.alert("출생년도 입력형식이 잘못되었습니다. 수정 후 다시 제출해주세요!")
            return;
        }
        else {
            this.setState({
                loading: true
            })
            const userObject = {
                email: this.state.email,
                name: this.state.name,
                verified: false,
                gender: this.state.gender,
                major: this.state.major,
                kakaoTalkId: this.state.kakaoTalkId,
                enrolledYear: "2022/2023",
                yearOfBirth: this.state.yearOfBirth,
                role: 'Freshmen',
                verificationFileUrl: undefined,
                password: crypto.SHA512(this.state.password).toString(),
            }
            if (this.state.email.split("@")[1] === "u.nus.edu") {
                userObject.verified = true;
                userObject.role = 'Current'
                if (this.state.fileSelected) {
                    const ref = 'verifications/' + this.state.email + "(" + this.state.name + ")/" + this.state.fileSelected.name;
                    const url = process.env.REACT_APP_HOST + "/api/uploadFile/" + ref
                    const formData = new FormData()
                    formData.append('file', this.state.fileSelected)
                    const response = await fetch(url, {
                        method: "PUT",
                        body: formData
                    })
                    if (response.status !== 200) {
                        this.setState({
                            loading: false,
                        })
                        window.alert("프로필 생성에 실패했습니다: " + response.body)
                    }
                    const json = await response.json()
                    userObject.verificationFileUrl = json.url
                    const signUpUrl = process.env.REACT_APP_HOST + "/api/auth/signup"
                    const signUpResponse = await fetch(signUpUrl, {
                        method: "POST",
                        body: JSON.stringify(userObject),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    if (signUpResponse.status == 200) {
                        window.alert("프로필 생성이 완료되었습니다. \nNUS 이메일을 사용하여 재학생으로 처리되었습니다. \n보내드린 이메일의 링크를 눌러 본인 인증을 완료해 계정을 활성화시켜주세요! \n\n 이메일이 오지 않는다면 스팸함을 확인해주세요!")
                        this.setState({
                            loading: false,
                        })
                        this.props.history.push("/");
                    }
                    else {
                        this.setState({
                            loading: false,
                        })
                        window.alert("프로필 생성에 실패했습니다: " + signUpResponse.body)
                    }
                }
            }
            else {
                if (this.state.fileSelected) {
                    const ref = 'verifications/' + this.state.email + "(" + this.state.name + ")/" + this.state.fileSelected.name;
                    const url = process.env.REACT_APP_HOST + "/api/uploadFile/" + ref
                    const formData = new FormData()
                    formData.append('file', this.state.fileSelected)
                    const response = await fetch(url, {
                        method: "PUT",
                        body: formData
                    })
                    if (response.status !== 200) {
                        this.setState({
                            loading: false,
                        })
                        window.alert("프로필 생성에 실패했습니다: " + response.body)
                    }
                    const json = await response.json()
                    userObject.verificationFileUrl = json.url
                    const signUpUrl = process.env.REACT_APP_HOST + "/api/auth/signup"
                    const signUpResponse = await fetch(signUpUrl, {
                        method: "POST",
                        body: JSON.stringify(userObject),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    if (signUpResponse.status == 200) {
                        window.alert("프로필 생성이 완료되었습니다. \nNUS 이메일을 사용하여 재학생으로 처리되었습니다. \n보내드린 이메일의 링크를 눌러 본인 인증을 완료해 계정을 활성화시켜주세요! \n\n 이메일이 오지 않는다면 스팸함을 확인해주세요!")
                        this.setState({
                            loading: false,
                        })
                        this.props.history.push("/");
                    }
                    else {
                        this.setState({
                            loading: false,
                        })
                        window.alert("프로필 생성에 실패했습니다: " + signUpResponse.body)
                    }
                }
            }
        }

    }

    handleFileSelect = (event: any) => {
        event.preventDefault();
        const file = event.target.files[0]
        if (file) {
            if (file.size > 1048576 * 5) {
                window.alert("파일 크기는 5MB 이하여야 합니다. 파일 업로드를 취소합니다.")
                return;
            }
            else {
                this.setState({
                    fileSelected: file
                })
            }
        }
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
                {this.state.loading ? <LoadingBlocker><LoadingText>거의 다 됐어요! 조금만 기다려주세요 :)</LoadingText></LoadingBlocker> : <></>}
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
                        <InputContainer>
                            <InputMandatoryIndicator>*</InputMandatoryIndicator>
                            <InputInner>
                                <Input
                                    name="name"
                                    type="string"
                                    placeholder="한글 이름"
                                    required
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                                <InputGuide>ex) 김재혁</InputGuide>
                            </InputInner>
                        </InputContainer>
                        <InputContainer>
                            <InputMandatoryIndicator>*</InputMandatoryIndicator>
                            <InputInner>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="이메일 / Email"
                                    required
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <InputGuide>NUS이메일을 사용하시면 자동으로 재학생 처리해드려요! 개인 이메일 사용시 추후에 NUS이메일로 변경하시면 재학생 처리됩니다.</InputGuide>
                            </InputInner>
                        </InputContainer>
                        <InputContainer>
                            <InputMandatoryIndicator>*</InputMandatoryIndicator>
                            <InputInner>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="비밀번호 / Password"
                                    required
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <InputGuide>강력한 비밀번호를 입력해주세요!</InputGuide>
                            </InputInner>
                        </InputContainer>
                        <InputContainer>
                            <InputMandatoryIndicator>*</InputMandatoryIndicator>
                            <InputInner>
                                <Input
                                    name="gender"
                                    type="string"
                                    placeholder="성별 / Gender"
                                    required
                                    value={this.state.gender}
                                    onChange={this.handleChange}
                                />
                                <InputGuide>Male / Female / 기타 (자유롭게 기재)</InputGuide>
                            </InputInner>
                        </InputContainer>
                        <InputContainer>
                            <InputMandatoryIndicator>*</InputMandatoryIndicator>
                            <InputInner>
                                <Input
                                    name="major"
                                    type="string"
                                    placeholder="학과 / Major & Minor"
                                    required
                                    value={this.state.major}
                                    onChange={this.handleChange}
                                />
                                <InputGuide>입학증명서에 기재된대로 적어주세요! ex) Computer Science Course with Minor in Entrepreneurship</InputGuide>
                            </InputInner>
                        </InputContainer>
                        <InputContainer>
                            <InputMandatoryIndicator>*</InputMandatoryIndicator>
                            <InputInner>
                                <Input
                                    name="yearOfBirth"
                                    type="string"
                                    placeholder="출생 년도 / Year of Birth"
                                    required
                                    value={this.state.yearOfBirth}
                                    onChange={this.handleChange}
                                />
                                <InputGuide>"2002" 처럼 4자리 숫자로 적어주세요!</InputGuide>
                            </InputInner>
                        </InputContainer>
                        <InputContainer>
                            <InputMandatoryIndicator></InputMandatoryIndicator>
                            <InputInner>
                                <Input
                                    name="kakaoTalkId"
                                    type="string"
                                    placeholder="카카오톡 ID / KakaoTalk ID"
                                    required={false}
                                    value={this.state.kakaoTalkId}
                                    onChange={this.handleChange}
                                />
                                <InputGuide>입력하시면 신입생 카카오톡 단톡방에 초대해드립니다! 나중에 초대 받기 번거로울수 있으니 입력하시는걸 적극 권장드려요!</InputGuide>
                            </InputInner>
                        </InputContainer>

                        <AddDoc>
                            <AddDocTitle>합격증명서 제출</AddDocTitle>
                            <AddDocDiv>
                                <AddDocButton>
                                    파일 선택
                                    <input type="file" name='file' accept="application/pdf, image/jpg, image/jpeg, image/png" onChange={this.handleFileSelect} style={{ 'display': 'none' }} />
                                </AddDocButton>
                                <FileName>{this.state.fileSelected?.name}</FileName>
                            </AddDocDiv>
                        </AddDoc>


                        {/* Will be adding name, nickname, etc. */}
                        <SubmitButton type="submit" value="Sign Up!" />
                        <ToSignIn to="/signin" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>계정이 이미 있으신가요? 여길 눌러 로그인하세요!</ToSignIn>
                    </Form>
                </Container>
            </>
        )
    }
}

export default SignUp;