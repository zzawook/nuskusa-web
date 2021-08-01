import React from 'react';
import { Link } from 'react-router-dom';
import { authService, dbService } from '../utils/firebaseFunctions';

type UserProps = {
    
}

type UserState = {
    email: string,
    password: string,
    fullName: string
}


class SignUp extends React.Component<UserProps, UserState> {
    constructor(props: UserProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fullName: '',
        }
    }
    handleChange = (event: any) => {
        const value = event.target.value;
        if (event.target.name === 'email') {
            this.setState({
                email: value
            })
        }
        else if (event.target.name === 'password') {
            this.setState({
                password: value
            })
        }
        else if (event.target.name === 'fullName') {
            this.setState({
                fullName: value
            })
        }
    }

    handleSubmit = async (event: any) => {
        event.preventDefault();
        await authService.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(async (userCredential) => {
                const userObject = {
                    email: this.state.email,
                    fullName: this.state.fullName,
                    isVerified: false,
                    role: 'User'
                }
                await dbService.collection('users').doc(userCredential.user?.uid).set(userObject);
            })
            .catch((error) => {
                console.error(error);
            });
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
                    <input
                        name="fullName"
                        type="string"
                        placeholder="이름 (영어로, 성 먼저)/Name (Last name first)"
                        required
                        value={this.state.fullName}
                        onChange={this.handleChange}
                    >
                    </input>
                    {/* Will be adding name, nickname, etc. */}
                    <input type="submit" value="Sign In"></input>
                </form>
                Already have an account? Click <Link to='/signin'>here</Link> to create an account!
            </>
        )
    }
}

export default SignUp;