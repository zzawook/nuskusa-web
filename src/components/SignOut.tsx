import React from 'react';
import { authService } from '../utils/firebaseFunctions';

class SignOut extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
        this.state = {

        }
    }

    onSignOutClick = () => {
        authService.signOut();
    }

    render = () => {
        return (
            <button onClick={this.onSignOutClick}></button>
        )
    }
}

export default SignOut;