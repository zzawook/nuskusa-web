import React from 'react';
import { authService } from '../utils/firebaseFunctions';

class SignOut extends React.Component<any, {}> {
    constructor(props: any) {
        super(props);
        this.state = {

        }
    }

    onSignOutClick = async () => {
        const url = process.env.REACT_APP_HOST + "/api/auth/signout";
        const response = await fetch(url, {
            method: "POST"
        })
        if (response.status == 200) {
            window.location.reload();
        }
        else {
            window.alert("로그아웃 중 오류가 발생했습니다: " + response.body)
        }
    }

    render = () => {
        return (
            <button onClick={this.onSignOutClick}>Sign Out</button>
        )
    }
}

export default SignOut;