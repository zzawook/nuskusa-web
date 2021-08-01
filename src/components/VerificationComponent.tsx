import React from 'react';
import { dbService, storageService } from '../utils/firebaseFunctions';

type VerificationProps = {
    verificationId: string,
    downloadURL: string,
    owner: string,
    username: string,
    userUID: string
}

class VerificationComponent extends React.Component<VerificationProps, {}> {
    constructor(props: VerificationProps) {
        super(props);
        this.state = { }
    }

    onAccept = () => {
        storageService.ref(`verifications/${this.props.verificationId}`)
            .delete()
            .then(() => {
                dbService.collection('users').doc(this.props.userUID).update({
                    isVerified: true
                })
            })
            .catch(error => {
                console.error(error);
            });
    }

    onReject = () => {
        storageService.ref(`verifications/${this.props.verificationId}`)
            .delete()
            .catch(error => {
                console.error(error);
            });
    }

    render = () => {
        return (
            <div>
                <img src={this.props.downloadURL} alt=''></img>
            </div>
        )
    }
}

export default VerificationComponent;