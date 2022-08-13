import firebase from 'firebase';
import React from 'react';
import { User } from '../../types/User';
import { FirestoreNotification } from '../../types/FirestoreNotification';
import { FirestoreUserVerification } from '../../types/FirestoreUserVerification';
import { dbService, storageService } from '../../utils/firebaseFunctions';
import { Headline } from '../../utils/ThemeText';

type VerificationProps = {
    verificationId: string,
    firestoreVerificationData: FirestoreUserVerification
}

class VerificationComponent extends React.Component<VerificationProps, { reason: string, error: string, }> {
    constructor(props: VerificationProps) {
        super(props);
        this.state = {
            reason: "",
            error: "",
        }
    }

    handleAccept = async () => {
        await storageService.ref(`verifications/${this.props.verificationId}`)
            .delete()
            .then(async () => {
                const userDetail = (await dbService.collection('verifications').doc(this.props.verificationId).get()).data() as User
                dbService.collection('users').doc(this.props.firestoreVerificationData.ownerUID).update({
                    verified: true,
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
        if (this.state.reason.trim() === "") {
            this.setState({
                error: "There has to be a valid reason to reject."
            })
            return;
        }
        await storageService.ref(`verifications/${this.props.verificationId}`)
            .delete()
            .then(async () => {
                try {
                    const batch = dbService.batch()
                    const verificationsRef = dbService.collection('verifications').doc(this.props.verificationId)
                    const userRef = dbService.collection('users').doc(this.props.verificationId)
                    const notification: FirestoreNotification = {
                        isRead: false,
                        notificationType: "verification",
                        contentType: "reject",
                        source: "verification",
                        message: `Your verification was rejected. Reason: ${this.state.reason}`,
                        link: `/boards`,
                        data: this.state.reason,
                        timestamp: firebase.firestore.Timestamp.now(),
                    };
                    batch.delete(verificationsRef)
                    batch.update(userRef, {
                        verified: false,
                        notificationArray: firebase.firestore.FieldValue.arrayUnion(notification),
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

    handleReasonChange = (event: any) => {
        this.setState({
            reason: event.target.value,
        })
    }

    render = () => {
        return (
            <div style={{ border: "1px solid" }}>
                <Headline><a target="_blank" rel="noopener noreferrer" href={this.props.firestoreVerificationData.downloadURL} style={{ color: "white" }}>Image/PDF Link</a></Headline>
                {/* <img src={this.props.firestoreVerificationData.downloadURL} alt='' width="640"></img> <br /> */}
                <Headline>Name: {this.props.firestoreVerificationData.fullname}</Headline>
                <Headline>Author: {this.props.firestoreVerificationData.owner}</Headline>
                <Headline>Faculty: {this.props.firestoreVerificationData.faculty}</Headline>
                <Headline>Major: {this.props.firestoreVerificationData.major}</Headline>
                <Headline>Enrolled Year: {this.props.firestoreVerificationData.enrolledYear}</Headline>
                <Headline>School Email: {this.props.firestoreVerificationData.schoolEmail}</Headline>
                <Headline>Accept: <button onClick={this.handleAccept}>Verify</button></Headline>
                <Headline>Reason:
                    <input type="text" onChange={this.handleReasonChange} />
                    <button onClick={this.handleReject}>Reject</button>
                </Headline>
                <Headline color="red">{this.state.error}</Headline>
            </div>
        )
    }
}

export default VerificationComponent;