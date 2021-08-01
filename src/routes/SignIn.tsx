import React from 'react';
import { Link } from 'react-router-dom';
import { authService, dbService } from '../utils/firebaseFunctions';
import firebase from 'firebase';

type UserProps = {

}

type UserObject = {
    email: string,
    password: string
}

class SignIn extends React.Component<UserProps, UserObject> {
    constructor(props: UserProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    handleChange = (event: any) => {
        if (event.target.name === 'email') {
            this.setState({
                email: event.target.value
            })
        }
        else if (event.target.name === 'password') {
            this.setState({
                password: event.target.value
            })
        }
    }

    handleSubmit = async (event: any) => {
        event.preventDefault();
        authService.setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(async () => {
            return await authService.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                console.log('success!')
            })
            .catch((error) => {
                console.error(error);
            });
        })

    }
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        placeholder="이메일/Email"
                        required
                        value={this.state.email}
                        onChange={this.handleChange}
                    ></input>
                    <input
                        name="password"
                        type="password"
                        placeholder="비밀번호/Password"
                        required
                        value={this.state.password}
                        onChange={this.handleChange}
                    ></input>
                    {/* Will be adding name, nickname, etc. */}
                    <input type="submit" value="Sign In"></input>
                </form>
                Don't have an account? Click <Link to='/signup'>here</Link> to create an account!
            </>
        )
    }
}

export default SignIn;