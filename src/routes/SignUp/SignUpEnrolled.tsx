import React from 'react';
import { Link } from 'react-router-dom';
import CSS from 'csstype';
import { authService, dbService, storageService } from '../../utils/firebaseFunctions';
import styled from 'styled-components'
import { FlexColumn } from '../../components/utils/UsefulDiv';
import { CgYoutube } from 'react-icons/cg';



const height = window.innerHeight;
const width = window.innerWidth;
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
    username: string,
    major: string,
    gender: string,
    KTId: string,
    loading: boolean,
    enrolledYear: string,
    yob: string,
}

class SignUp extends React.Component<UserProps, UserState> {
    constructor(props: UserProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            major: "",
            gender: "",
            KTId: "",
            loading: false,
            enrolledYear: "",
            yob: "",
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
        else if (event.target.name == "yob") {
            this.setState({
                yob: value
            })
        }
        else if (event.target.name == "enrolledYear") {
            this.setState({
                enrolledYear: value
            })
        }
    }

    handleSubmit = async (event: any) => {
        event.preventDefault();
        if (this.state.enrolledYear.split("/")[0].length != 4 || this.state.enrolledYear.split("/")[1].length != 4) {
            window.alert("입학년도 입력형식이 잘못되었습니다. 수정 후 다시 제출해주세요!")
            return;
        }
        if (this.state.yob.length != 4 && ! /^\d+$/.test(this.state.yob)) {
            window.alert("출생년도 입력형식이 잘못되었습니다. 수정 후 다시 제출해주세요!")
            return;
        }
        if (this.state.email.split("@")[1] != "u.nus.edu") {
            window.alert("NUS 이메일 주소를 사용하지 않았습니다. 학교 이메일로 가입해주세요!")
        }
        else {
            this.setState({
                loading: true
            })
            await authService.createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(async (userCredential) => {
                    const userObject = {
                        email: this.state.email,
                        username: this.state.username,
                        userId: userCredential.user?.uid,
                        isVerified: true,
                        role: 'Current',
                        gender: this.state.gender,
                        major: this.state.major,
                        enrolledYear: this.state.enrolledYear,
                        yob: this.state.yob,
                    }
                    userObject.isVerified = true;
                    userObject.role = 'Current'
                    dbService.collection('users').doc(userCredential.user?.uid).set(userObject).then(() => {
                        authService.currentUser?.sendEmailVerification().then(() => {
                            window.alert("프로필 생성이 완료되었습니다. 입력하신 NUS 이메일로 보내드린 메일의 링크를 클릭하셔서 이메일 인증을 완료해주세요! \n\n 이메일이 오지 않는다면 Junk 폴더를 확인해주세요!")
                            authService.signOut()
                            this.setState({
                                loading: false,
                            })
                            this.props.history.push("/")
                        })
                    });
                })
                .catch((error) => {
                    this.setState({
                        loading: false,
                    })
                    window.alert("Sign up failed. Please try again later.")

                });
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
                        <InputContainer>
                            <InputMandatoryIndicator>*</InputMandatoryIndicator>
                            <InputInner>
                                <Input
                                    name="username"
                                    type="string"
                                    placeholder="이름 (영어로, 성 먼저) / Name (Last name first)"
                                    required
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                                <InputGuide>ex) Kim Jae Hyeok</InputGuide>
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
                                <InputGuide>NUS이메일 (@u.nus.edu) 을 사용해주세요!</InputGuide>
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
                                    name="major"
                                    type="string"
                                    placeholder="학과 / Major & Minor"
                                    required={false}
                                    value={this.state.major}
                                    onChange={this.handleChange}
                                />
                                <InputGuide>재학증명서에 기재된대로 적어주세요! ex) Computer Science Course with Minor in Entrepreneurship</InputGuide>
                            </InputInner>
                        </InputContainer>
                        <InputContainer>
                            <InputMandatoryIndicator>*</InputMandatoryIndicator>
                            <InputInner>
                                <Input
                                    name="enrolledYear"
                                    type="string"
                                    placeholder="입학 년도 / Year of Admission"
                                    required
                                    value={this.state.enrolledYear}
                                    onChange={this.handleChange}
                                />
                                <InputGuide>YYYY/YYYY 형식으로 적어주세요! ex) 2021/2022</InputGuide>
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
                                    name="yob"
                                    type="string"
                                    placeholder="출생년도 / Year of Birth"
                                    required
                                    value={this.state.yob}
                                    onChange={this.handleChange}
                                />
                                <InputGuide>"2002" 와 같이 4자리 숫자로 적어주세요!</InputGuide>
                            </InputInner>
                        </InputContainer>
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