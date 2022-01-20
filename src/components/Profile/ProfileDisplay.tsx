import React from 'react'
import styled from 'styled-components'
import { FirebaseUser } from '../../types/FirebaseUser'
import { FirestoreNotification } from '../../types/FirestoreNotification'
import { authService, dbService } from '../../utils/firebaseFunctions'
import Avatar from './Avatar'
import NotificationComponent from './NotificationComponent'
import { AiOutlineClose } from 'react-icons/ai';

type ProfileDisplayProps = {
    firebaseUserData: FirebaseUser,
    isOpen: boolean
    onExitClick: any
}

type ProfileDisplayState = {
    notificationArray: any[],
    mouseLogoutEnter: boolean,
}

class ProfileDisplay extends React.Component<ProfileDisplayProps, ProfileDisplayState> {
    constructor(props: ProfileDisplayProps) {
        super(props)
        this.state = {
            notificationArray: [],
            mouseLogoutEnter: false,
        }
    }

    componentDidMount = () => {
        const NoNewsAlert = styled.p`
            width: 42vh;
            text-align: center;
        `
        dbService
            .collection("users").doc(authService.currentUser?.uid)
            .get()
            .then((doc) => {
                const data = doc.data();
                const notifications = data?.notificationArray as FirestoreNotification[];
                let key = 0;
                let notificationComponents = notifications
                    .map((element: any) => {
                        key++;
                        return <>
                            <NotificationComponent data={element} key={key} ></NotificationComponent>
                        </>
                    }).reverse();
                if (notificationComponents.length === 0) {
                    this.setState({
                        notificationArray: [<NoNewsAlert>There is nothing new!</NoNewsAlert>]
                    })
                }
                this.setState({
                    notificationArray: notificationComponents
                })
            })
    }

    render = () => {
        const Wrapper = styled.div`
            position: fixed;
            top: 0vh;
            right: 0px;
            display: flex;
            flex-direction: column;
            cursor: default;
            z-index: 99;
            height: 900px;
            background-color: #0B121C;
            /* border: 1px solid gray; */
            box-shadow: -6px 0px 20px rgba(0, 0, 0, 0.25);
        `

        const ProfileDisplayWrapper = styled.div`
            width: 42vh;
            margin-top: 4vh;
            display: flex;
            flex-direction: row;
            height: 50px;
            top: 9vh;
        `
        const NameEmailWrapper = styled.div`
            flex: 2;
            display: flex;
            flex-direction: column;
            margin-left: 2vh;
        `
        const Name = styled.span`
            flex: 1;
            line-height: 25px;
            font-weight: 800;
            color: white;
        `
        const Email = styled.span`
            flex: 1;
            line-height: 25px;
            color: rgba(255,255,255,0.6);

        `
        const ProfileDisplayEmpty = styled.div`
            display: none;
        `
        const NotificationWrapper = styled.div`
            overflow-y: scroll;
        `
        const BottomWrapper = styled.div`
            display: flex;
            flex-direction: row;
        `
        const LogOut = styled.button`
            border: none;
            background-color: transparent;
            color: white;
            height: 50px;
            width: 150px;
            flex-direction: row;
            cursor: pointer;
            text-decoration: ${this.state.mouseLogoutEnter ? 'underline' : 'none'};
        `
        const LogOutText = styled.span`
            line-height: 50px;
            font-weight: 700;
            font-size: 15px;
        `
        const LogOutImage = styled.img`
            vertical-align: middle;
            margin-right: 2vh;
        `
        const EmptyDiv = styled.div`
            flex: 1;
        `
        const ProfileEdit = styled.span`
            :hover {
                text-decoration: underline;
            }

            flex: 1;
            line-height: 50px;
            color: white;
            margin-right: 10px;
            text-decoration: none;
            cursor: pointer;
        `

        const handleMouseEnter = (e: any) => {
            e.preventDefault();
            this.setState({
                mouseLogoutEnter: true,
            })
        }

        const handleMouseLeave = (e: any) => {
            e.preventDefault();
            this.setState({
                mouseLogoutEnter: false,
            })
        }

        const handleLogout = (e: any) => {
            authService.signOut().then(() => {
                this.forceUpdate();
            }).catch(error => {
                console.log(error);
                this.forceUpdate();
            });
        }

        return (
            <>
                {
                    this.props.isOpen ?
                        <Wrapper>
                            <AiOutlineClose onClick={this.props.onExitClick} style={{
                                border: 'none', width: '20px', height: '20px', marginTop: '3vh', marginLeft: '85%', cursor: 'pointer'
                            }} />
                            <ProfileDisplayWrapper>
                                <Avatar firebaseUserData={this.props.firebaseUserData} dimension={40} isOnNavbar={false} />
                                <NameEmailWrapper>
                                    <Name>{this.props.firebaseUserData.username}</Name>
                                    <Email>{this.props.firebaseUserData.email}</Email>
                                </NameEmailWrapper>
                            </ProfileDisplayWrapper>
                            <NotificationWrapper>
                                {this.state.notificationArray}
                            </NotificationWrapper>
                            <LogOut onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleLogout}>
                                <LogOutImage src={"https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FLogOut.png?alt=media&token=7223c08e-e1d5-47d2-9bfd-3f637a8798a5"} />
                                <LogOutText>Log Out</LogOutText>
                            </LogOut>
                        </Wrapper>
                        :
                        <ProfileDisplayEmpty />
                }
            </>

        )
    }
}

export default ProfileDisplay