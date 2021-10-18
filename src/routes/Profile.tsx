import React from 'react'
import { authService, dbService, storageService } from '../utils/firebaseFunctions';
import SignOut from '../components/SignOut'
import Navbar from '../components/Navbar';
import { FirebaseUser } from '../types/FirebaseUser';

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
    faculty: ''
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
            faculty: ''
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
                (error) => {
                    console.error(error);
                },
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
    render() {
        return (
            <div>
                <Navbar />
                {this.props.firebaseUserData.username}
                <SignOut />
                {this.props.firebaseUserData.isVerified ?
                    <>
                        You are verified!
                    </>
                    :
                    <form onSubmit={this.handleSubmit}>
                        <input type='file' onChange={this.handleChange}></input>
                        <input type='submit'></input>
                    </form>
                }
            </div>
        )
    }
}

export default Profile;