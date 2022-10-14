import React from 'react';
import styled from 'styled-components'
import Navbar from '../../components/Admin/Navbar';
import { User } from '../../types/User';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import UserSlip from '../../components/Admin/UserSlip'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: #18202B;
    justify-content: center;
    align-items: center;
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
type AdminVerificationProps = {
    userData: User,
}

type AdminVerificationState = {
    users: Array<any>,
    dummy: boolean,
    loading: boolean,
}

class AdminVerification extends React.Component<AdminVerificationProps, AdminVerificationState> {
    constructor(props: AdminVerificationProps) {
        super(props);
        this.state = {
            users: [],
            dummy: false,
            loading: false,
        }
        this.setLoading.bind(this);
        this.unsetLoading.bind(this);
    }

    async componentDidMount() {
        await this.getVerificationData();
    }

    getVerificationData = async () => {
        const url = process.env.REACT_APP_HOST + "/api/auth/getToVerify";
        const response = await fetch(url, {
            method: "GET"
        })
        if (response.status == 200) {
            const data = await response.json();
            console.log(data)
            this.setState({
                users: data,
            })
        }
    }

    setLoading = () => {
        this.setState({
            loading: true,
        })
    }

    unsetLoading = () => {
        this.setState({
            loading: false,
        })
    }

    componentDidUpdate() {
        console.log(this.state.users)
    }


    static getDerivedStateFromProps(newProps: AdminVerificationProps, prevState: AdminVerificationState) {
        return {
            dummy: !prevState.dummy
        }
    }

    render = () => {
        return (
            <>
                {this.state.loading ? <LoadingBlocker><LoadingText>거의 다 됐어요! 조금만 기다려주세요 : </LoadingText></LoadingBlocker> : <></>}
                <Wrapper>
                    <Navbar userData={this.props.userData} />
                    {this.state.users.map(request => {
                        console.log(request)
                        return <UserSlip setLoading={this.setLoading} updateFunc={this.getVerificationData} verificationId={request.id} unsetLoading={this.unsetLoading} fileURL={request.fileUrl} email={request.user.email} role={request.user.role} name={request.user.name} gender={request.user.gender} major={request.user.major} kakaoTalkId={request.user.kakaoTalkId} />
                    })}
                </Wrapper>
            </>

        )
    }
}

export default AdminVerification