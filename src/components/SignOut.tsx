import React from 'react';
import { authService } from '../utils/firebaseFunctions';

class SignOut extends React.Component<any, {}> {
    constructor(props: any) {
        super(props);
        this.state = {

        }
    }

    onSignOutClick = () => {
        authService.signOut();
        window.location.reload();
    }

    render = () => {
        return (
            <button onClick={this.onSignOutClick}>Sign Out</button>
        )
    }
}

export default SignOut;