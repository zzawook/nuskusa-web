import React from 'react'
import { authService, dbService, storageService } from '../utils/firebaseFunctions';
import SignOut from '../components/SignOut'
import Navbar from '../components/Navbar';
import { User } from '../types/User';
import styled from 'styled-components';
import { darkTheme, Theme } from '../utils/ThemeColor';
import ProfilePicker from '../components/Profile/ProfilePicker';

type UserProps = {
    userData: User
}

type UserState = {
    name: '',
    verificationFile: undefined,
    verified: false,
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
            name: '',
            verificationFile: undefined,
            verified: false,
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

    render = () => {
        const Wrapper = styled.div`
            background: ${this.state.theme.background};
            height: 100vh;
        `
        return (
            <Wrapper>
                <Navbar userData={this.props.userData} />
                <ProfilePicker userData={this.props.userData} />
                <SignOut />
            </Wrapper>
        )
    }
}

export default Profile;