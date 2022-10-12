import firebase from 'firebase';
import React from 'react';
import { User } from '../../types/User';
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
        if (! window.confirm(this.props.firestoreVerificationData.fullname)) {

        }
        const url = process.env.REACT_APP_HOST + "/api/auth/verifyUser";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                verificationId: this.props.verificationId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status == 200) {

        }
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