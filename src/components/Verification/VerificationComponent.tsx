import React from 'react';
import { FirebaseUser } from '../../types/FirebaseUser';
import { FirestoreUserVerification } from '../../types/FirestoreUserVerification';
import { dbService, storageService } from '../../utils/firebaseFunctions';

type VerificationProps = {
    verificationId: string,
    firestoreVerificationData: FirestoreUserVerification
}

class VerificationComponent extends React.Component<VerificationProps, {}> {
    constructor(props: VerificationProps) {
        super(props);
        this.state = {
            reason: "",
        }
    }

    handleAccept = async () => {
        await storageService.ref(`verifications/${this.props.verificationId}`)
            .delete()
            .then(async () => {
                const userDetail = (await dbService.collection('verifications').doc(this.props.verificationId).get()).data() as FirebaseUser
                dbService.collection('users').doc(this.props.firestoreVerificationData.ownerUID).update({
                    isVerified: true,
                    enrolledYear: userDetail.enrolledYear,
                    major: userDetail.major,
                    faculty: userDetail.faculty,
                    role: "Undergraduate",
                })
            })
            .then(async () => {
                await dbService.collection('verifications').doc(this.props.verificationId).delete()
            })
            .catch((error: any) => {
                console.error(error);
            });
    }

    handleReject = async () => {
        await storageService.ref(`verifications/${this.props.verificationId}`)
            .delete()
            .then(async () => {
                try {
                    const batch = dbService.batch()
                    const verificationsRef = dbService.collection('verifications').doc(this.props.verificationId)
                    const userRef = dbService.collection('users').doc(this.props.verificationId)
                    batch.delete(verificationsRef)
                    batch.update(userRef, {
                        isVerified: false
                    })
                    await batch.commit()
                } catch (e) {
                    console.error(e)
                }
            })
            .catch((error: any) => {
                console.error(error);
            });
    }

    render = () => {
        return (
            <div>
                <img src={this.props.firestoreVerificationData.downloadURL} alt='' width="640"></img> <br />
                {this.props.firestoreVerificationData.fullname} <br />
                {this.props.firestoreVerificationData.owner} <br />
                <button onClick={this.handleAccept}>Verify</button>
                <button onClick={this.handleReject}>Reject</button>
            </div>
        )
    }
}

export default VerificationComponent;