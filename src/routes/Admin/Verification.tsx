import React from 'react';
import styled from 'styled-components'
import Navbar from '../../components/Admin/Navbar';
import { FirebaseUser } from '../../types/FirebaseUser';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { dbService } from '../../utils/firebaseFunctions';
import UserSlip from '../../components/Admin/UserSlip'
import { AiOutlineConsoleSql } from 'react-icons/ai';

const width = window.innerWidth;
const height = window.innerHeight;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: #18202B;
    justify-content: center;
    align-items: center;
`
type AdminVerificationProps = {
    firebaseUserData: FirebaseUser
}

type AdminVerificationState = {
    users: Array<any>,
    dummy: boolean,
}

class AdminVerification extends React.Component<AdminVerificationProps, AdminVerificationState> {
    constructor(props: AdminVerificationProps) {
        super(props);
        this.state = {
            users: [],
            dummy: false,
        }
    }

    componentDidMount() {
        
        dbService.collection('toVerify').onSnapshot(docs => {
            const userArray: Array<any> = [];
            docs.forEach(doc => {
                const data = doc.data();
                console.log(data)
                dbService.collection('users').doc(data.userId).get().then(userDoc => {
                    const userData = userDoc.data();
                    console.log(userData)
                    if (userData) {
                        userData.userType = data.userType;
                        userArray.push(userData)
                    }
                    this.setState({
                        users: userArray,
                    })
                })
            })
        })
    }

    componentDidUpdate() {
        console.log(this.state.users)
    }

    static getDerivedStateFromProps(newProps: AdminVerificationProps, prevState: AdminVerificationState) {
        return {
            dummy: ! prevState.dummy
        }
    }

    render = () => {
        return (
            <Wrapper>
                <Navbar firebaseUserData={this.props.firebaseUserData} />
                {this.state.users.map(user => {
                    return <UserSlip graduationLetterURL={user.graduationDocumentURL} acceptanceLetterURL={user.acceptanceLetterURL} email={user.email} role={user.role} userId={user.userId} userName={user.username} gender={user.gender} major={user.major} userType={user.userType} KTId={user.KTId}/>
                })}
            </Wrapper>
        )
    }
}

export default AdminVerification