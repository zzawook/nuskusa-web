import React from 'react'
import { authService, dbService, storageService } from '../utils/FirebaseFunctions';
import SignOut from '../components/SignOut'
import Navbar from '../components/Navbar';

type UserProps = {

}

type UserState = {
    username: string,
    verificationFile?: File | undefined,
    isVerified: boolean,
    role: string, // User, Undergraduate, Graduate, Admin
    enrolledYear?: string | undefined,
    major?: string | undefined,
    faculty?: string | undefined
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

    componentDidMount = () => {
        this.fetchUserData();
    }

    fetchUserData = () => {
        const user = authService.currentUser
        if (user) {
            dbService
                .collection('users').doc(user.email as string)
                .onSnapshot((querySnapshot) => {
                    if (querySnapshot.exists) {
                        const data = querySnapshot.data();
                        if (data) {
                            this.setState({
                                username: data.username,
                                verificationFile: data.verificationFile,
                                isVerified: data.isVerified,
                                role: data.role, // User, Undergraduate, Graduate, Admin
                                enrolledYear: data.enrolledYear,
                                major: data.major,
                                faculty: data.faculty
                            })
                        }
                    }
                })
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
        if (this.state.verificationFile) {
            const uploadTask = storageService
                .ref(`verifications/${this.state.verificationFile.name}`)
                .put(this.state.verificationFile);
            uploadTask.on('state_changed',
                (snapshot) => { },
                (error) => {
                    console.error(error);
                },
                () => {
                    if (this.state.verificationFile) {
                        storageService.ref('verifications')
                            .child(this.state.verificationFile.name)
                            .getDownloadURL()
                            .then((url) => {
                                dbService.collection('verifications').add({
                                    downloadURL: url,
                                    username: authService.currentUser?.uid,
                                    owner: authService.currentUser?.email,
                                    ownerUID: authService.currentUser?.uid
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
                {this.state.username}
                <SignOut />
                {this.state.isVerified ?
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