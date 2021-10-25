import React from 'react'
import Navbar from '../components/Navbar'
import VerificationComponent from '../components/Verification/VerificationComponent'
import { FirebaseUser } from '../types/FirebaseUser'
import { FirestoreUserVerification } from '../types/FirestoreUserVerification'
import { authService, dbService } from '../utils/firebaseFunctions'

type VerificationProps = {
    firebaseUserData: FirebaseUser
}

type VerificationState = {
    verificationComponentArray: any[],
    verificationId: string
}

class Verification extends React.Component<VerificationProps, VerificationState> {
    constructor(props: any) {
        super(props)
        this.state = {
            verificationComponentArray: [],
            verificationId: ''
        }
    }

    componentDidMount = () => {
        this.fecthVerificationCollection();
    }

    fecthVerificationCollection = () => {
        if (authService.currentUser) {
            dbService
                .collection('verifications')
                .onSnapshot((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        const arr = querySnapshot.docs.map((element) => {
                            const data = element.data() as FirestoreUserVerification
                            return (
                                <VerificationComponent
                                    verificationId={element.id}
                                    firestoreVerificationData={data}
                                />
                            )
                        })
                        this.setState({
                            verificationComponentArray: arr,
                        })
                    }
                })
        }
    }

    render = () => {
        return (
            <>
                <Navbar firebaseUserData={this.props.firebaseUserData} />
                {this.props.firebaseUserData.role === 'Admin' ?
                    <div>
                        Admin!
                        {this.state.verificationComponentArray}
                    </div>
                    :
                    <div>
                        Only Admins can view this page.
                    </div>
                }
            </>
        )
    }
}

export default Verification;