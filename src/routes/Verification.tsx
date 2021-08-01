import React from 'react'
import VerificationComponent from '../components/VerificationComponent'
import { authService, dbService } from '../utils/firebaseFunctions'

type VerificationState = {
    role: string,
    verificationComponentArray: any[],
    verificationId: string
}

class Verification extends React.Component<{}, VerificationState> {
    constructor(props: any) {
        super(props)
        this.state = {
            role: 'User',
            verificationComponentArray: [],
            verificationId: ''
        }
    }

    componentDidMount = () => {
        this.fetchUserRole();
        this.fecthVerificationCollection();
    }

    fetchUserRole = () => {
        if (authService.currentUser) {
            dbService
                .collection('users').doc(authService.currentUser.uid)
                .onSnapshot((querySnapshot) => {
                    if (querySnapshot.exists) {
                        const data = querySnapshot.data();
                        if (data) {
                            this.setState({
                                role: data.role
                            })
                        }
                    }
                });
        }
    }

    fecthVerificationCollection = () => {
        if (authService.currentUser) {
            dbService
                .collection('verifications')
                .onSnapshot((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        const arr = querySnapshot.docs.map((element) => {
                            return (
                                <VerificationComponent
                                    verificationId={element.id}
                                    downloadURL={element.data().downloadURL as string}
                                    owner={element.data().owner as string}
                                    username={element.data().username as string} 
                                    userUID={element.data().ownerUID as string}
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
                {this.state.role === 'Admin' ?
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