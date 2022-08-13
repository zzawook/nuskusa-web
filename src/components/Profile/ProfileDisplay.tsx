import React from 'react'
import styled from 'styled-components'
import { User } from '../../types/User'
import { FirestoreNotification } from '../../types/FirestoreNotification'
import { authService, dbService } from '../../utils/firebaseFunctions'
import Avatar from './Avatar'
import NotificationComponent from './NotificationComponent'
import { AiOutlineClose } from 'react-icons/ai';

type ProfileDisplayProps = {
    userData: User,
    isOpen: boolean
    onExitClick: any
}

type ProfileDisplayState = {
    notificationArray: any[],
    mouseLogoutEnter: boolean,
}

class ProfileDisplay extends React.Component<ProfileDisplayProps, ProfileDisplayState> {
    private _isMounted = false;
    constructor(props: ProfileDisplayProps) {
        super(props)
        this.state = {
            notificationArray: [],
            mouseLogoutEnter: false,
        }
    }

    componentDidMount = () => {
        this._isMounted = true;
        if (this._isMounted) {
            this.fetchNotification();
        }
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    fetchNotification = async () => {
        const NoNewsAlert = styled.p`
            width: 42vh;
            text-align: center;
        `
        await dbService
            .collection("users").doc(authService.currentUser?.uid)
            .get()
            .then((doc) => {
                const data = doc.data();
                let notifications = data?.notificationArray as FirestoreNotification[];
                let notificationComponents: any[] = [];
                if (notifications) {
                    notifications = notifications.sort((a: FirestoreNotification, b: FirestoreNotification) => {
                        if (a.isRead && !b.isRead) {
                            return 1;
                        } else if (a.isRead && b.isRead) {
                            if (a.timestamp > b.timestamp) {
                                return 1;
                            } else if (a.timestamp.isEqual(b.timestamp)) {
                                return 0;
                            } else {
                                return -1;
                            }
                        } else if (!a.isRead && b.isRead) {
                            return -1;
                        } else {
                            return 0;
                        }
                    })
                    let key = 0;
                    notificationComponents = notifications
                        .map((element: any) => {
                            key++;
                            return <>
                                <NotificationComponent data={element} key={key} ></NotificationComponent>
                            </>
                        }).reverse();
                }

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
        const ProfileWrapper = styled.div`
            display: flex;
            flex-direction: row;
        `
        const LogOut = styled.button`
            margin-top: 45px;
            border: none;
            background-color: transparent;
            color: white;
            height: 50px;
            width: 150px;
            flex-direction: row;
            cursor: pointer;
            text-decoration: ${this.state.mouseLogoutEnter ? 'underline' : 'none'};
            opacity: 0.6;

            :hover {
                opacity: 1.0;
            }
        `
        const LogOutText = styled.span`
            font-weight: 700;
            font-size: 15px;
        `
        const LogOutImage = styled.img`
            vertical-align: middle;
            margin-right: 2vh;
        `
        const EmptyDiv = styled.div`
        `
        const ProfileEdit = styled.span`
            :hover {
                text-decoration: underline;
                opacity: 1.0;
            }

            line-height: 50px;
            color: white;
            margin-top: 45px;
            margin-left: 4.5vh;
            text-decoration: none;
            cursor: pointer;
            font-weight: 700;
            font-size: 15px;
            opacity: 0.6;
        `
        const BottomBanner = styled.div`
            display: flex;
            flex-direction: row;
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
                window.location.reload();
            }).catch(error => {
                window.location.reload();
            });
        }

        const handleEditProfile = () => {
            window.location.href = "#/editProfile"
        }

        return (
            <>
                {
                    this.props.isOpen ?
                        <Wrapper>
                            <AiOutlineClose onClick={this.props.onExitClick} style={{
                                border: 'none', width: '20px', height: '20px', marginTop: '3vh', marginLeft: '85%', cursor: 'pointer'
                            }} />
                            <ProfileWrapper>
                                <ProfileDisplayWrapper>
                                    <Avatar userData={this.props.userData} dimension={40} isOnNavbar={false} />
                                    <NameEmailWrapper>
                                        <Name>{this.props.userData.name}</Name>
                                        <Email>{this.props.userData.email}</Email>
                                    </NameEmailWrapper>
                                </ProfileDisplayWrapper>
                                <BottomBanner>
                                    <ProfileEdit onClick={handleEditProfile}>Edit Profile</ProfileEdit>
                                    <LogOut onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleLogout}>
                                        <LogOutImage src={"https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FLogOut.png?alt=media&token=7223c08e-e1d5-47d2-9bfd-3f637a8798a5"} />
                                        <LogOutText>Log Out</LogOutText>
                                    </LogOut>
                                    <EmptyDiv />
                                </BottomBanner>
                            </ProfileWrapper>
                            <NotificationWrapper>
                                {this.state.notificationArray}
                            </NotificationWrapper>

                        </Wrapper>
                        :
                        <ProfileDisplayEmpty />
                }
            </>

        )
    }
}

export default ProfileDisplay