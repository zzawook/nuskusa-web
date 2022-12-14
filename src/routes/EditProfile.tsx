import React from 'react';
import Navbar from '../components/Navbar';
import { User } from '../types/User';
import styled from 'styled-components';
import firebase from 'firebase';
import Avatar from "../components/Profile/Avatar"
import crypto from "crypto-js"



const Container = styled.div`
    height: 100%;
    width: 100%;
`
const ProfileContainer = styled.div`
    position: absolute;
    top: 15vh;
    width: 70%;
    left: 15%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    z-index: 50;
    margin-bottom: 50px;
`
const ImgAndName = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    z-index: 10;
`
const ProfileMargin = styled.div`
    height: 10px;
`
const RemoveProfile = styled.button`
    :hover {
        color: #0B121C;
        background-color: white;
    }

    font-size: 11px;
    background-color: transparent;
    border: 1px solid;
    height: 16px;
    border-radius: 8px;
    color: white;
    margin-bottom: 5px;
    z-index: 10;
`
const ChangeProfile = styled.label`
    :hover {
        color: #0B121C;
        background-color: white;
    }

    font-size: 11px;
    background-color: transparent;
    border: 1px solid;
    height: 16px;
    border-radius: 8px;
    color: white;
    margin-bottom: 5px;
    padding-left: 5px;
    padding-right: 5px;
    z-index: 10;
`
const Change = styled.input`
    display: none;
    z-index: 10;
`
const Name = styled.span`
    font-size: 30px;
    font-weight: 800;
    z-index: 10;
`
const Email = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    z-index: 10;
`
const EmailText = styled.span`
    margin-left: 10%;
    font-size: 17px;
    font-weight: 600;
    width: 20%;
    z-index: 10;   
`
const EmailInput = styled.input`
    //width: 60%;
    height: 30px;
    font-weight: 600;
    color: #d9d9d9;
    z-index: 10;
    background-color: transparent;
    opacity: 0.85;
    margin-right: 15px;
    line-height: 30px;
    border: 1px solid white;
`
const EmailButton = styled.div`
    width: 150px;
    height: 35px;
    background-color: #0B121C;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px solid white;
`
const EmailButtonText = styled.span`
    text-align: center;
    line-height: 35px;
    font-size: 14px;
    color: white;
`
const Major = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    z-index: 10;
`
const MajorText = styled.span`
    margin-left: 10%;
    font-size: 17px;
    font-weight: 600;
    width: 20%;
    z-index: 10;
`
const MajorInput = styled.input`
    width: 50%;
    height: 30px;
    color: #d9d9d9;
    z-index: 10;
    background-color: transparent;
    border: 1px solid white;
    margin-right: 10px;
`
const MajorButton = styled.button`
    width: 10%;
    padding-top: 1px;
    padding-bottom: 1px;
    color: white;
    background-color: transparent;
    border: 1px solid white;
    cursor: pointer;
    
    :hover {
        background-color: white;
        color: #0b121c;
    }
`
const EnrolledYear = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    z-index: 10;
`
const EnrolledYearText = styled.span`
    margin-left: 10%;
    font-size: 17px;
    font-weight: 600;
    width: 20%;
    z-index: 10;
`
const EnrolledYearInput = styled.span`
    margin-bottom: 20px;
    color: #d9d9d9;
    z-index: 10;
`
const Password = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 25px;
`
const PasswordText = styled.span`
    margin-left: 10%;
    font-size: 17px;
    font-weight: 600;
    width: 20%;
    z-index: 10;
`
const PasswordInputs = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
`
const OrigPassword = styled.input`
    font-size: 15px;
    height: 25px;
    margin-bottom: 10px;
    font-weight: 600;
`
const NewPassword = styled.input`
    margin-bottom: 10px;   
    font-weight: 600; 
    font-size: 15px;
    height: 25px;
`
const ConfirmPassword = styled.input`
    margin-bottom: 10px;  
    font-weight: 600;
    font-size: 15px;
    height: 25px;
`
const PasswordButton = styled.button`
    :hover {
        color: #cccccc;
    }

    width: 200px;
    height: 50px;
    background-color: #BDA06D;
    font-size: 15px;
    font-weight: 800;
    color: white;
    border: none;
    cursor: pointer;
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
    z-index: 100000;
`
const LoadingText = styled.span`
    background-color: black;
    color: white;
    font-size: 16px;
    font-weight: 600;
    z-index: 99999;
`
type EditProfileProps = {
    userData: User,
    userId: string
}

type EditProfileState = {
    userData: User,
    profileChanged: boolean,
    verificiationOpen: boolean,
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string,
    emailChange: boolean,
    loading: boolean,
    newEmail: string,
}

class EditProfile extends React.Component<EditProfileProps, EditProfileState> {

    private inputRef: React.RefObject<HTMLInputElement>

    constructor(props: any) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            userData: {
                name: "name",
                email: "tempEmail@u.nus.edu",
                role: 'User',
                enrolledYear: undefined,
                major: undefined,
                faculty: undefined,
                profileImageUrl: undefined,
                yearOfBirth: "",
                gender: "",
            },
            profileChanged: false,
            verificiationOpen: false,
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            emailChange: false,
            loading: false,
            newEmail: ""
        }
    }

    componentDidMount = () => {
        let canChangeEmail = false;
        if (this.props.userData.role == "Freshmen" && this.props.userData.email?.split("@")[1] != "u.nus.edu") {
            canChangeEmail = true;
        }
        this.setState({
            userData: this.props.userData,
            emailChange: canChangeEmail,
            newEmail: this.props.userData.email,
        })
    }

    componentDidUpdate = () => {
    }

    static getDerivedStateFromProps = (newProps: EditProfileProps, prevState: EditProfileState) => {
        // let canChangeEmail = false;
        // if (newProps.userData.role == "Freshmen" && newProps.userData.email.split("@")[1] != "u.nus.edu") {
        //     canChangeEmail = true;
        // }
        // let newEmail = prevState.newEmail
        // if (prevState.newEmail === "" && newProps.userData.email) {
        //     newEmail = newProps.userData.email
        // }
        // return {
        //     userData: newProps.userData,
        //     emailChange: canChangeEmail,
        //     newEmail: newEmail,
        // }
    }

    render = () => {
        const handleRemoveProfile = async (e: any) => {
            e.preventDefault();

            if (window.confirm("????????? ????????? ???????????? ???????????? ?????? ????????? ???????????? ???????????????. ?????????????????????????")) {
                this.setState({
                    loading: true,
                })
                const currentProfile = this.state.userData;
                currentProfile.profileImageUrl = 'undefined';

                const url = process.env.REACT_APP_HOST + "/api/profile/editProfile/" + this.state.userData.email;
                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify({
                        profileImageUrl: "undefined"
                    })
                })

                const newUser = this.state.userData;
                newUser.profileImageUrl = undefined;

                if (response.status == 200) {
                    this.setState({
                        loading: false,
                        userData: newUser,
                    })
                    window.alert("????????? ???????????? ??????????????????.")
                }
                else {
                    this.setState({
                        loading: false,
                    })
                    window.alert("????????? ????????? ?????? ?????? ????????? ??????????????????.")
                }
            }
        }

        const handleEmailChangeClick = async (e: any) => {
            if (this.state.newEmail.split("@")[1] != "u.nus.edu") {
                window.alert("@u.nus.edu??? ????????? NUS ???????????? ????????????. ?????? ??????????????????.")
                return;
            }
            this.setState({
                loading: true,
            })
            const url = process.env.REACT_APP_HOST + "/api/profile/editProfile/" + this.state.userData.email;
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    email: this.state.newEmail
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (response.status == 200) {
                window.alert("????????? ????????? ??????????????? ?????????????????????. ???????????? ???????????? ?????? ????????? ?????????????????????. ????????? ????????? ?????? ????????? ????????? ??????????????????! ??????????????? ???????????????.");
                this.setState({
                    loading: false,
                })
                const logoutUrl = process.env.REACT_APP_HOST + "/api/auth/signout";
                const logoutResponse = await fetch(logoutUrl, {
                    method: "POST",
                    redirect: 'follow',
                })
            }
            else if (response.status == 400) {
                this.setState({
                    loading: false,
                })
                window.alert("?????? ???????????? ????????? ???????????????.")
            }
            else if (response.status == 409) {
                this.setState({
                    loading: false
                })
                window.alert("????????? ???????????? ???????????? ????????? ?????? ???????????????.")
            }
            else {
                this.setState({
                    loading: false,
                })
                window.alert("????????? ????????? ??????????????????.");
            }
        }

        const handleEmailChange = (e: any) => {
            e.preventDefault()
            this.setState({
                newEmail: e.target.value
            })
        }

        const handleImageUpload = async (e: any) => {
            e.preventDefault();
            this.setState({
                loading: true,
            })
            const target = e.target;
            const profile = this.state.userData;

            const file = target.files[0];
            profile.profileImageUrl = file;
            let type = null;

            if (file.type === 'image/png') {
                type = '.png'
            }
            else if (file.type === 'image/jpeg') {
                type = '.jpeg'
            }
            else {
                type = '.gif'
            }
            const url = process.env.REACT_APP_HOST + "/api/profile/uploadProfileImage/" + this.props.userId + type
            const formData = new FormData()
            formData.append("file", file)
            const response = await fetch(url, {
                method: "POST",
                body: formData
            })
            if (response.status != 200) {
                this.setState({
                    loading: false,
                })
                window.alert('????????? ????????? ????????? ???????????????')
                return;
            }

            const json = await response.json()
            const editProfileUrl = process.env.REACT_APP_HOST + "/api/profile/editProfile/" + this.state.userData.email;
            const editProfileResponse = await fetch(editProfileUrl, {
                method: "POST",
                body: JSON.stringify({
                    profileImageUrl: json.url
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (editProfileResponse.status == 200) {
                profile.profileImageUrl = json.url
                this.setState({
                    profileChanged: true,
                    userData: profile,
                    loading: false,
                })
                window.alert("????????? ????????? ??????????????? ???????????????")
            }
            else {
                this.setState({
                    loading: false,
                })
                window.alert('????????? ????????? ????????? ???????????????')
            }
        }

        const handleCurrentPasswordChange = (e: any) => {
            this.setState({
                currentPassword: e.target.value
            })
        }

        const handleNewPasswordChange = (e: any) => {
            this.setState({
                newPassword: e.target.value,
            })
        }

        const handleConfirmNewPasswordChange = (e: any) => {
            this.setState({
                confirmNewPassword: e.target.value
            })
        }

        const handlePasswordChange = async (e: any) => {
            if (this.state.confirmNewPassword != this.state.newPassword) {
                window.alert('New password and Confirm password does not match. Please check again. \n\n ??? ??????????????? ???????????? ????????? ???????????? ????????????. ?????? ????????????.')
                return;
            }

            this.setState({
                loading: true,
            })

            const url = process.env.REACT_APP_HOST + "/api/auth/updatePassword";
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    prevPassword: crypto.SHA512(this.state.currentPassword).toString(),
                    password: crypto.SHA512(this.state.newPassword).toString()
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (response.status == 200) {
                window.alert("??????????????? ??????????????? ??????????????????.")
                this.setState({
                    loading: false,

                })
            }
            else if (response.status == 401) {
                window.alert("?????? ??????????????? ????????????. ??????????????? ???????????? ???????????????.")
                this.setState({
                    loading: false,
                })
            }
            else {
                window.alert("??????????????? ???????????? ???????????????.")
                this.setState({
                    loading: false,
                })
                return;
            }
        }

        const handleMajorInputChange = (e: any) => {
            e.preventDefault();
            const temp = this.state.userData
            temp.major = e.target.value;
            this.setState({
                userData: temp,
            })
        }

        const handleMajorChangeSubmit = async (e: any) => {
            e.preventDefault();
            this.setState({
                loading: true,
            })
            const url = process.env.REACT_APP_HOST + "/api/profile/editProfile/" + this.state.userData.email;
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    major: this.state.userData.major,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status == 200) {
                this.setState({
                    loading: false,
                })
                window.alert("????????? ??????????????? ??????????????????.")
            }
            else {
                this.setState({
                    loading: false,
                })
                window.alert("?????? ?????? ??? ????????? ??????????????????.")
            }
        }

        return (
            <>
                {this.state.loading ? <LoadingBlocker><LoadingText>?????? ??? ?????????! ????????? ?????????????????? :)</LoadingText></LoadingBlocker> : <></>}
                <Container> 
                    <Navbar userData={this.props.userData} />
                    <ProfileContainer>
                        <ImgAndName>
                            <Avatar src={this.state.userData.profileImageUrl} dimension={100} isOnNavbar={true}></Avatar>
                            <ProfileMargin></ProfileMargin>
                            <RemoveProfile onClick={handleRemoveProfile}>Remove Profile Image</RemoveProfile>
                            <ChangeProfile htmlFor="profile-upload"><Change id={'profile-upload'} onChange={handleImageUpload} type='file' accept="image/png, image/gif, image/jpeg" />Change Profile Image</ChangeProfile>
                            <Name>{this.props.userData.name}</Name>
                        </ImgAndName>
                        <Email>
                            <EmailText>????????? / Email</EmailText>
                            <EmailInput value={this.state.newEmail} onChange={handleEmailChange} disabled={!this.state.emailChange} ref={this.inputRef} />
                            {this.state.emailChange ? <EmailButton onClick={handleEmailChangeClick}><EmailButtonText>NUS Email??? ????????????</EmailButtonText></EmailButton> : <></>}
                        </Email>
                        <Major>
                            <MajorText>Major / ??????</MajorText>
                            <MajorInput value={this.props.userData.major === undefined ? 'N/A. Verify account to register major.' : this.props.userData.major} onChange={handleMajorInputChange} disabled={this.props.userData.role == 'Graduated'}></MajorInput>
                            <MajorButton onClick={handleMajorChangeSubmit}>Apply</MajorButton>
                        </Major>
                        <EnrolledYear>
                            <EnrolledYearText>Enrolled Year / ????????????</EnrolledYearText>
                            <EnrolledYearInput>{this.props.userData.enrolledYear === undefined ? 'N/A. Verify account to register enrolled year.' : this.props.userData.enrolledYear}</EnrolledYearInput>
                        </EnrolledYear>
                        <EnrolledYear>
                            <EnrolledYearText>Year of Birth / ????????????</EnrolledYearText>
                            <EnrolledYearInput>{this.props.userData.yearOfBirth === undefined ? 'N/A. Verify account to register enrolled year.' : this.props.userData.yearOfBirth}</EnrolledYearInput>
                        </EnrolledYear>
                        <EnrolledYear>
                            <EnrolledYearText>Gender / ??????</EnrolledYearText>
                            <EnrolledYearInput>{this.props.userData.gender === undefined ? 'N/A. Verify account to register enrolled year.' : this.props.userData.gender}</EnrolledYearInput>
                        </EnrolledYear>
                        <Password>
                            <PasswordText>Change Password</PasswordText>
                            <PasswordInputs>
                                <OrigPassword placeholder={'Current Password / ?????? ????????????'} type={'password'} onBlur={handleCurrentPasswordChange} />
                                <NewPassword placeholder={'New Password  / ??? ????????????'} type={'password'} onBlur={handleNewPasswordChange} />
                                <ConfirmPassword placeholder={'Confirm New Password / ??? ???????????? ??????'} type={'password'} onBlur={handleConfirmNewPasswordChange} />
                                <PasswordButton onClick={handlePasswordChange}>Update Password</PasswordButton>
                            </PasswordInputs>
                        </Password>
                    </ProfileContainer>
                </Container>
            </>
        )
    }
}

export default EditProfile;
