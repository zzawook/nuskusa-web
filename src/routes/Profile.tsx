import React from 'react'
import { authService, dbService, storageService } from '../utils/firebaseFunctions';
import SignOut from '../components/SignOut'
import Navbar from '../components/Navbar';
import { FirebaseUser } from '../types/FirebaseUser';
import VerificationRequest from '../components/Verification/VerificationRequest';
import styled from 'styled-components';
import { darkTheme, Theme } from '../utils/ThemeColor';
import ProfilePicker from '../components/Profile/ProfilePicker';

type UserProps = {
    firebaseUserData: FirebaseUser
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
        if (this.props.firebaseUserData.verificationFile) {
            const uploadTask = storageService
                .ref(`verifications/${this.props.firebaseUserData.verificationFile.name}`)
                .put(this.props.firebaseUserData.verificationFile);
            uploadTask.on('state_changed',
                (snapshot) => { },
                () => {
                    if (this.props.firebaseUserData.verificationFile) {
                        storageService.ref('verifications')
                            .child(this.props.firebaseUserData.verificationFile.name)
                            .getDownloadURL()
                            .then((url) => {
                                dbService.collection('verifications').add({
                                    downloadURL: url,
                                    owner: authService.currentUser?.email,
                                    ownerUID: authService.currentUser?.uid,
                                    fullname: this.props.firebaseUserData.username,
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
                <Navbar firebaseUserData={this.props.firebaseUserData} />
                {/* {this.props.firebaseUserData.username} */}
                {this.props.firebaseUserData.isVerified ?
                    <></>
                    :
                    <VerificationRequest firebaseUserData={this.props.firebaseUserData} isModal={false} onClose={() => {}} />
                }
                <ProfilePicker firebaseUserData={this.props.firebaseUserData} />
                <SignOut />
            </Wrapper>
        )
    }
}

export default Profile;