import React from 'react';
import styled from 'styled-components'
import Navbar from '../../components/Admin/Navbar';
import { FirebaseUser } from '../../types/FirebaseUser';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { dbService, authService } from '../../utils/firebaseFunctions';

const width = window.innerWidth;
const height = window.innerHeight;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: #18202B;
    justify-content: center;
    align-items: center;
    width: 60vw;
    padding-top: 10px;
    padding-bottom: 10px;
`
const TopBlock = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-bottom: 10px;
`
const Name = styled.span`
    color: white;
    font-size: 22px;
    font-weight: 600;
`
const UserType = styled.span`
    color: #BDBDBD;
    font-size: 16px;
    margin-left: auto;
`
const BottomBlock = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`
const Profile = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
`
const InfoSlip = styled.span`
    width: 100%;
    color: #A6A6A6;
`
const DocLink = styled.a`
    width: 100%;
    text-decoration: underline;
    color: white;
`
const ButtonDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    width: 40%;
`
const Buttons = styled.div`
    display: flex;
    flex-direction: row;
`
const AcceptButton = styled.div`
    padding: 10px;
    padding-left: 30px;
    padding-right: 30px;
    margin: 15px;
    background-color: green;
    cursor: pointer;
`
const DeclineButton = styled.div`
    padding: 10px;
    padding-left: 30px;
    padding-right: 30px;
    margin: 15px;
    margin-right: 0px;
    background-color: red;
    cursor: pointer;
`
type AdminVerificationProps = {
    docURL: string,
    email: string,
    role: string,
    userId: string,
    userType: string,
    userName: string,
    gender: string,
    major: string,
    KTId: string,
}

type AdminVerificationState = {

}

class AdminVerification extends React.Component<AdminVerificationProps, AdminVerificationState> {
    constructor(props: AdminVerificationProps) {
        super(props);
        this.state = {

        }
        this.handleAccept = this.handleAccept.bind(this);
        this.handleDecline = this.handleDecline.bind(this);
    }

    userTypeMap: {[name: string]: string} = {
        'Offered': '신입',
        'Grduated': '졸업'
    }

    componentDidMount() {
    }
    

    handleAccept(event: any) {
        if (! window.confirm(this.props.userName + "님을 승인하시겠습니까?")) {
            return;
        }
        dbService.collection('toVerify').doc(this.props.userId).delete().then(() => {
            dbService.collection('users').doc(this.props.userId).update({
                isVerified: true,
            }).then(async () => {
                window.alert("정상적으로 승인되었습니다.")
                /*const transporter = nodemailer.createTransport({
                    host: "u.nus.edu",
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.MAIL_USERNAME,
                        pass: process.env.MAIL_PASSWORD,
                    },
                });
                transporter.sendMail({
                    from: 'NUS 한인회',
                    to: this.props.email,
                    subject: "[NUS 한인회] 귀하의 계정이 인증되었습니다.",
                    text: "안녕하세요, NUS 한인회 IT 팀장 김재혁입니다. \n\n귀하의 계정의 인증이 완료되어 안내드립니다. \n\n일전에 본 이메일 주소로 보내드린 본인 인증 링크를 클릭해 이메일 주소 인증을 완료하신 후, 한인회 웹사이트를 이용해주시면 감사하겠습니다. \n\n NUS 한인회 드림.",
                }).then(() => {
                    console.log('정상적으로 승인되었습니다.')
                })*/
            })
        })
    }

    handleDecline(event: any) {
        event.preventDefault();
        if (!window.confirm(this.props.userName + "님의 인증요청을 거부하시겠습니까?")) {
            return;
        }
        dbService.collection('toVerify').doc(this.props.userId).delete().then(async () => {
            window.alert("정상적으로 반려되었습니다. 해당 유저에게 고지하는 것 잊지 말아주세요! 이메일 주소: " + this.props.email)
            /*const transporter = nodemailer.createTransport({
                host: "u.nus.edu",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD,
                },
            });
            transporter.sendMail({
                from: 'NUS 한인회',
                to: this.props.email,
                subject: "[NUS 한인회] 귀하의 계정 인증이 반려되었습니다.",
                text: "안녕하세요, NUS 한인회 IT 팀장 김재혁입니다. \n\n유감스럽게도 귀하의 계정의 인증이 반려되어 안내드립니다. \n\n 반려 사유를 아래와 같이 안내드리오니, 반려 사유를 참고하시어 nuskusa@gmail.com로 재가입 문의 부탁드립니다. \n\n 반려사유: " + reason + "\n\n감사합니다. \nNUS 한인회 드림.",
            }).then(() => {
                console.log('정상적으로 반려되었습니다.')
            })*/
        })
    }

    render = () => {
        
        return (
            <Wrapper>
                <TopBlock>
                    <Name>{this.props.userName}</Name>
                    <UserType>{this.userTypeMap[this.props.userType]}</UserType>
                </TopBlock>
                <BottomBlock>
                    <Profile>
                        <InfoSlip>- 이메일: {this.props.email}</InfoSlip>
                        <InfoSlip>- 성별: {this.props.gender}</InfoSlip>
                        <InfoSlip>- 학과: {this.props.major}</InfoSlip>
                        <InfoSlip>- 카카오톡 ID: {this.props.KTId}</InfoSlip>
                        <DocLink href={this.props.docURL} target="_blank" rel="noreferrer noopener">인증문서 링크</DocLink>
                    </Profile>
                    <ButtonDiv>
                        <Buttons>
                            <AcceptButton onClick={this.handleAccept}>승인</AcceptButton>
                            <DeclineButton onClick={this.handleDecline}>반려</DeclineButton>
                        </Buttons>
                    </ButtonDiv>
                </BottomBlock>
            </Wrapper>
        )
    }
}

export default AdminVerification