import React from 'react';
import Navbar from '../components/Navbar';
import { FirebaseUser } from '../types/FirebaseUser';
import styled from 'styled-components';
import { authService, dbService, storageService } from '../utils/firebaseFunctions'
import firebase from 'firebase';
import VerificationRequest from '../components/Verification/VerificationRequest';

type EditProfileProps = {
    firebaseUserData: FirebaseUser,
    userId: string
}

type EditProfileState = {
    userData: FirebaseUser,
    profileChanged: boolean,
    verificiationOpen: boolean,
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string,
}

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
const Profile = styled.img`
    width: 15vh;
    height: 15vh;
    margin-top: 20px;
    margin-bottom: 5px;
    z-index: 10;
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
    z-index: 10;
`
const EmailText = styled.span`
    margin-left: 10%;
    font-size: 17px;
    font-weight: 600;
    width: 20%;
    z-index: 10;
`
const EmailInput = styled.span`
    width: 60%;
    height: 30px;
    font-weight: 600;
    color: #d9d9d9;
    z-index: 10;
    color: white;
    opacity: 0.85;
`
const Verified = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    z-index: 10;
`
const IsVerifiedText = styled.span`
    margin-left: 10%;
    font-size: 17px;
    font-weight: 600;
    width: 20%;
    z-index: 10;
`
const IsVerifiedAlert = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 10;
`
const IsVerified = styled.span`
    font-weight: 600;
    color: #d9d9d9;
    z-index: 10;
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
const MajorInput = styled.span`
    width: 60%;
    height: 30px;
    color: #d9d9d9;
    z-index: 10;
`
const Faculty = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    z-index: 10;
`
const FacultyText = styled.span`
    margin-left: 10%;
    font-size: 17px;
    font-weight: 600;
    width: 20%;
    z-index: 10;
`
const FacultyInput = styled.span`
    color: #d9d9d9;
    z-index: 10;
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
const GetVerified = styled.span`
    :hover {
        text-decoration: underline;
        color: white;
    }
    cursor: pointer;
    z-index: 10;
`
const Password = styled.div`
    display: flex;
    flex-direction: row;
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
class EditProfile extends React.Component<EditProfileProps, EditProfileState> {
    constructor(props: any) {
        super(props);
        this.state = {
            userData: {
                username: "username",
                userId: "",
                email: "tempEmail@u.nus.edu",
                verificationFile: undefined,
                isVerified: false,
                role: 'User',
                enrolledYear: undefined,
                major: undefined,
                faculty: undefined,
                profilePictureURL: undefined
            },
            profileChanged: false,
            verificiationOpen: false,
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        }
    }

    componentDidMount = () => {
        this.setState({
            userData: this.props.firebaseUserData,
        })
    }

    componentDidUpdate = () => {
        if (!authService.currentUser) {
            window.location.href = window.location.origin + '/#/';
        }
    }

    getDerivedStateFromProps = (newProps: any, prevState: any) => {
        if (!authService.currentUser) {
            window.location.href = window.location.origin + '/#/';
        }
        this.setState({
            userData: this.props.firebaseUserData,
        })
    }

    render = () => {
        const defaultProfile = 'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fprofile_default.png?alt=media&token=61ab872f-8f29-4d50-b22e-9342e0581fb5'

        const handleRemoveProfile = (e: any) => {
            e.preventDefault();

            if (window.confirm("This will remove your profile image and replace with default counterpart. Continue? \n 기존의 프로필 이미지를 삭제하고 기본 프로필 이미지로 대체합니다. 계속하시겠습니까?")) {
                const currentProfile = this.state.userData;
                currentProfile.profilePictureURL = 'undefined';

                dbService.collection('users').doc(this.props.userId).update({ profilePictureURL: 'undefined' })

                this.setState({
                    userData: currentProfile,
                    profileChanged: false,
                })
            }


        }

        const handleImageUpload = (e: any) => {
            e.preventDefault();
            const target = e.target;
            const profile = this.state.userData;

            const file = target.files[0];
            profile.profilePictureURL = file;
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

            storageService.ref('users/' + this.props.userId + type).put(file).then(snapshot => {
                snapshot.ref.getDownloadURL().then(url => {
                    dbService.collection('users').doc(this.props.userId).update({
                        profilePictureURL: url
                    }).then(snapshot => {
                        this.setState({
                            profileChanged: true,
                            userData: profile,
                        })
                        window.alert("Profile image is successfully changed! 프로필 사진을 성공적으로 바꾸었어요!")
                    }).catch(err => {
                        window.alert('Profile image change was unsuccessful. Please try again later. 프로필 사진을 바꾸지 못했어요. 나중에 다시 시도해주세요.')
                    })
                }).catch(err => {
                    window.alert('Profile image change was unsuccessful. Please try again later. 프로필 사진을 바꾸지 못했어요. 나중에 다시 시도해주세요.')
                });
            }).catch(err => {
                window.alert('Profile image change was unsuccessful. Please try again later. 프로필 사진을 바꾸지 못했어요. 나중에 다시 시도해주세요.')
            })
        }

        const handleOpenVerify = (e: any) => {
            this.setState({
                verificiationOpen: true,
            })
        }

        const closeModal = (e: any) => {
            this.setState({
                verificiationOpen: false,
            })
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

        const handlePasswordChange = (e: any) => {
            if (this.state.confirmNewPassword != this.state.newPassword) {
                window.alert('New password and Confirm password does not match. Please check again. \n\n 새 비밀번호와 비밀번호 확인이 일치하지 않습니다. 확인 바랍니다.')
                return;
            }

            const user = authService.currentUser;

            if (typeof user?.email != 'string') {
                window.alert("Please wait a few seconds and try again.")
                return;
            }

            const credential = firebase.auth.EmailAuthProvider.credential(user?.email, this.state.currentPassword)
            user?.reauthenticateWithCredential(credential).then((newCredential) => {
                const newPassword = this.state.newPassword;

                user?.updatePassword(newPassword).then(() => {
                    window.alert("Password was updated successfully")
                    return;
                }).catch(error => {
                    window.alert("An error occurred. Please try again")
                    return;
                })

            }).catch(error => {
                window.alert("An unknown error occurred during confirming current password.")
                return;
            })

        }

        return (
            <Container>
                <Navbar firebaseUserData={this.props.firebaseUserData} />
                {this.state.verificiationOpen ? <VerificationRequest firebaseUserData={this.props.firebaseUserData} isModal={false} onClose={closeModal} /> : <></>}
                <ProfileContainer>
                    <ImgAndName>
                        <Profile src={this.state.profileChanged ? URL.createObjectURL(this.state.userData.profilePictureURL) : this.props.firebaseUserData.profilePictureURL === 'undefined' || this.props.firebaseUserData.profilePictureURL === "" || this.props.firebaseUserData.profilePictureURL === undefined ? defaultProfile : this.props.firebaseUserData.profilePictureURL}></Profile>
                        <RemoveProfile onClick={handleRemoveProfile}>Remove Profile Image</RemoveProfile>
                        <ChangeProfile htmlFor="profile-upload"><Change id={'profile-upload'} onChange={handleImageUpload} type='file' accept="image/png, image/gif, image/jpeg" />Change Profile Image</ChangeProfile>
                        <Name>{this.props.firebaseUserData.username}</Name>
                    </ImgAndName>
                    <Email>
                        <EmailText>이메일 / Email</EmailText>
                        <EmailInput>{this.props.firebaseUserData.email}</EmailInput>
                    </Email>
                    <Verified>
                        <IsVerifiedText>Account Verification<br /> 계정 인증</IsVerifiedText>
                        <IsVerifiedAlert>
                            <IsVerified>{this.props.firebaseUserData.isVerified ? 'This account is verified. Enjoy full functionality of the website!' : 'This account is not verified. Verify now to enjoy full functionality of this website.'}</IsVerified>
                            <IsVerified>{this.props.firebaseUserData.isVerified ? '이 계정은 인증되었습니다. 웹사이트의 모든 기능들을 사용하실 수 있습니다!' : '이 계정은 인증되지 않았습니다. 지금 인증하여 모든 기능들을 사용해보세요!'}</IsVerified>
                            {this.props.firebaseUserData.isVerified ? <></> : <GetVerified onClick={handleOpenVerify}>Get Verified! / 계정 인증하기!</GetVerified>}
                        </IsVerifiedAlert>
                    </Verified>
                    <Major>
                        <MajorText>Major / 전공</MajorText>
                        <MajorInput>{this.props.firebaseUserData.major === undefined ? 'N/A. Verify account to register major.' : this.props.firebaseUserData.major}</MajorInput>
                    </Major>
                    <Faculty>
                        <FacultyText>Faculty / 학부</FacultyText>
                        <FacultyInput>{this.props.firebaseUserData.faculty === undefined ? 'N/A. Verify account to register faculty' : this.props.firebaseUserData.faculty}</FacultyInput>
                    </Faculty>
                    <EnrolledYear>
                        <EnrolledYearText>Enrolled Year / 입학년도</EnrolledYearText>
                        <EnrolledYearInput>{this.props.firebaseUserData.enrolledYear === undefined ? 'N/A. Verify account to register enrolled year.' : this.props.firebaseUserData.enrolledYear}</EnrolledYearInput>
                    </EnrolledYear>
                    <Password>
                        <PasswordText>Change Password</PasswordText>
                        <PasswordInputs>
                            <OrigPassword placeholder={'Current Password / 현재 비밀번호'} type={'password'} onBlur={handleCurrentPasswordChange} />
                            <NewPassword placeholder={'New Password  / 새 비밀번호'} type={'password'} onBlur={handleNewPasswordChange} />
                            <ConfirmPassword placeholder={'Confirm New Password / 새 비밀번호 확인'} type={'password'} onBlur={handleConfirmNewPasswordChange} />
                            <PasswordButton onClick={handlePasswordChange}>Update Password</PasswordButton>
                        </PasswordInputs>
                    </Password>
                </ProfileContainer>
            </Container>
        )
    }
}


export default EditProfile;
