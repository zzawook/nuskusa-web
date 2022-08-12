import React from 'react'
import { authService, dbService, storageService } from '../utils/firebaseFunctions';
import SignOut from '../components/SignOut'
import Navbar from '../components/Navbar';
import { User } from '../types/User';
import VerificationRequest from '../components/Verification/VerificationRequest';
import styled from 'styled-components';
import { darkTheme, Theme } from '../utils/ThemeColor';
import ProfilePicker from '../components/Profile/ProfilePicker';

type UserProps = {
    userData: User
}

type UserState = {
    username: '',
    verificationFile: undefined,
    isVerified: false,
    role: '', // User, Undergraduate, Graduate, Admin
    enrolledYear: '',
    major: '',
    faculty: '',
    theme: Theme
}

class Profile extends React.Component<UserProps, UserState> {
    constructor(props: UserProps) {
        super(props);
        this.state = {
            username: '',
            verificationFile: undefined,
            isVerified: false,
            role: '', // User, Undergraduate, Graduate, Admin
            enrolledYear: '',
            major: '',
            faculty: '',
            theme: darkTheme
        }
    }

    handleChange = (event: any) => {
        event.preventDefault();
        if (event.target.files[0]) {
            this.setState({
                verificationFile: event.target.files[0]
            })
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        if (this.props.userData.verificationFile) {
            const uploadTask = storageService
                .ref(`verifications/${this.props.userData.verificationFile.name}`)
                .put(this.props.userData.verificationFile);
            uploadTask.on('state_changed',
                (snapshot) => { },
                () => {
                    if (this.props.userData.verificationFile) {
                        storageService.ref('verifications')
                            .child(this.props.userData.verificationFile.name)
                            .getDownloadURL()
                            .then((url) => {
                                dbService.collection('verifications').add({
                                    downloadURL: url,
                                    owner: authService.currentUser?.email,
                                    ownerUID: authService.currentUser?.uid,
                                    fullname: this.props.userData.username,
                                    enrolledYear: this.state.enrolledYear,
                                    major: this.state.major,
                                    faculty: this.state.faculty
                                });
                            })
                    }
                }
            )
        }
    }
    render = () => {
        const Wrapper = styled.div`
            background: ${this.state.theme.background};
            height: 100vh;
        `
        return (
            <Wrapper>
                <Navbar userData={this.props.userData} />
                {/* {this.props.userData.username} */}
                {this.props.userData.isVerified ?
                    <></>
                    :
                    <VerificationRequest userData={this.props.userData} isModal={false} onClose={() => { }} />
                }
                <ProfilePicker userData={this.props.userData} />
                <SignOut />
            </Wrapper>
        )
    }
}

export default Profile;