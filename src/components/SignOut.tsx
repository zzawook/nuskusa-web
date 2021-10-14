import React from 'react';
import { authService } from '../utils/FirebaseFunctions';

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
            <button onClick={this.onSignOutClick}>Sign Out</button>
        )
    }
}

export default SignOut;