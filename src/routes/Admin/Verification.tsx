import React from 'react';
import styled from 'styled-components'
import Navbar from '../../components/Admin/Navbar';
import { User } from '../../types/User';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { dbService } from '../../utils/firebaseFunctions';
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

    componentDidMount() {
        dbService.collection('toVerify').onSnapshot(async docs => {
            let userArray: Array<any> = [];
            let promiseArray: Array<any> = [];
            docs.forEach(async doc => {
                const data = doc.data();
                let promise = dbService.collection('users').doc(data.userId).get().then(userDoc => {
                    const userData = userDoc.data();
                    if (userData) {
                        userData.userType = data.userType;
                        userArray.push(userData)
                    }
                })
                promiseArray.push(promise);
            })
            Promise.all(promiseArray).then(() => {
                this.setState({
                    users: userArray,
                })
            })
        })
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
                    {this.state.users.map(user => {
                        return <UserSlip setLoading={this.setLoading} unsetLoading={this.unsetLoading} graduationLetterURL={user.graduationDocumentURL} acceptanceLetterURL={user.acceptanceLetterURL} email={user.email} role={user.role} userId={user.userId} name={user.name} gender={user.gender} major={user.major} userType={user.userType} kakaoTalkId={user.kakaoTalkId} />
                    })}
                </Wrapper>
            </>

        )
    }
}

export default AdminVerification