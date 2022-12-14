import React from 'react'
import styled from 'styled-components'
import { User } from '../../types/User'
import { Notification } from '../../types/Notification'
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
        const url = process.env.REACT_APP_HOST + "/api/profile/getNotifications"

        const response = await fetch(url);
        if (response.status == 200) {
            const data: Notification[] = await response.json();
            if (data.length == 0) {
                this.setState({
                    notificationArray: [<NoNewsAlert>There is nothing new!</NoNewsAlert>]
                })
            }
            else {
                this.setState({
                    notificationArray: data.map(notif => {
                        return <NotificationComponent data={notif} />
                    })
                })
            }
        }
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

        const handleLogout = async (e: any) => {
            const url = process.env.REACT_APP_HOST + "/api/auth/signout";
            const response = await fetch(url, {
                method: "POST"
            })
            if (response.status == 200) {
                window.location.reload();
            }
            else {
                window.alert("???????????? ??? ????????? ??????????????????: " + response.body)
            }
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
                                    <Avatar src={this.props.userData.profileImageUrl} dimension={40} isOnNavbar={false} />
                                    <NameEmailWrapper>
                                        <Name>{this.props.userData.name}</Name>
                                        <Email>{this.props.userData.email}</Email>
                                    </NameEmailWrapper>
                                </ProfileDisplayWrapper>
                                <BottomBanner>
                                    <ProfileEdit onClick={handleEditProfile}>Edit Profile</ProfileEdit>
                                    <LogOut onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleLogout}>
                                        <LogOutImage src={"https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/source/LogOut.png"} />
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