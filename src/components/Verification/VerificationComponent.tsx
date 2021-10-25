import React from 'react';
import { FirestoreUserVerification } from '../../types/FirestoreUserVerification';
import { dbService, storageService } from '../../utils/firebaseFunctions';

type VerificationProps = {
    verificationId: string,
    firestoreVerificationData: FirestoreUserVerification
}

class VerificationComponent extends React.Component<VerificationProps, {}> {
    constructor(props: VerificationProps) {
        super(props);
        this.state = {}
    }

    handleAccept = () => {
        storageService.ref(`verifications/${this.props.verificationId}`)
            .delete()
            .then(() => {
                dbService.collection('users').doc(this.props.firestoreVerificationData.ownerUID).update({
                    isVerified: true
                })
            })
            .then(() => {
                dbService.collection('verifications').doc(this.props.verificationId).delete()
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleReject = () => {
        storageService.ref(`verifications/${this.props.verificationId}`)
            .delete()
            .then(() => {
                try {
                    const batch = dbService.batch()
                    const verificationsRef = dbService.collection('verifications').doc(this.props.verificationId)
                    const userRef = dbService.collection('users').doc(this.props.verificationId)
                    batch.delete(verificationsRef)
                    batch.update(userRef, {
                        isVerified: false
                    })
                    batch.commit()
                } catch (e) {
                    console.error(e)
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    render = () => {
        return (
            <div>
                <img src={this.props.firestoreVerificationData.downloadURL} alt=''></img> <br />
                {this.props.firestoreVerificationData.fullname} <br />
                {this.props.firestoreVerificationData.owner} <br />
                <button onClick={this.handleAccept}>Verify</button>
                <button onClick={this.handleReject}>Reject</button>
            </div>
        )
    }
}

export default VerificationComponent;