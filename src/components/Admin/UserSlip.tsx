import React from 'react';
import styled from 'styled-components'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { dbService } from '../../utils/firebaseFunctions';

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
    fileURL: string,
    email: string,
    role: string,
    name: string,
    gender: string,
    major: string,
    kakaoTalkId: string,
    setLoading: Function,
    unsetLoading: Function,
    verificationId: number,
    updateFunc: Function,
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

    userTypeMap: { [name: string]: string } = {
        'Freshmen': '신입생',
        'Graduated': '졸업생'
    }

    componentDidMount() {
        console.log(this.props)
    }

    async handleAccept(event: any) {
        if (!window.confirm(this.props.name + "님을 승인하시겠습니까?")) {
            return;
        }
        this.props.setLoading()
        const url = process.env.REACT_APP_HOST + "/api/auth/verifyUser"
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                verificationId: this.props.verificationId
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        await this.props.updateFunc();
        if (response.status == 200) {
            this.props.unsetLoading();
            window.alert("정상적으로 승인되었습니다.")
        }
        else {
            this.props.unsetLoading();
            window.alert("승인요청을 처리하지 못했습니다.")
        }
    }

    async handleDecline(event: any) {
        event.preventDefault();
        if (!window.confirm(this.props.name + "님의 인증요청을 거부하시겠습니까?")) {
            return;
        }
        const message = window.prompt("반려 사유를 적어주세요.");
        this.props.setLoading();
        const url = process.env.REACT_APP_HOST + "/api/auth/declineUser"
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                verificationId: this.props.verificationId,
                denialMessage: message,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        await this.props.updateFunc();
        if (response.status == 200) {
            this.props.unsetLoading();
            window.alert("정상적으로 반려되었습니다.")
        }
        else {
            this.props.unsetLoading();
            window.alert("반려요청을 정상적으로 처리하지 못했습니다.");
        }
    }

    render = () => {
        return (
            <Wrapper>
                <TopBlock>
                    <Name>{this.props.name}</Name>
                    <UserType>{this.userTypeMap[this.props.role]}</UserType>
                </TopBlock>
                <BottomBlock>
                    <Profile>
                        <InfoSlip>- 이메일: {this.props.email}</InfoSlip>
                        <InfoSlip>- 성별: {this.props.gender}</InfoSlip>
                        <InfoSlip>- 학과: {this.props.major}</InfoSlip>
                        <InfoSlip>- 카카오톡 ID: {this.props.kakaoTalkId}</InfoSlip>
                        {this.props.role == "Freshmen" ? <DocLink href={this.props.fileURL} target="blank" rel="noreferrer noopener">입학증명서 링크</DocLink> : <DocLink href={this.props.fileURL} target="blank" rel="noreferrer noopener">졸업증명서 링크</DocLink>}
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