import React from 'react'
import Navbar from '../components/Navbar'
import VerificationComponent from '../components/Verification/VerificationComponent'
import { authService, dbService } from '../utils/FirebaseFunctions'

type VerificationProps = {
    role: string
}

type VerificationState = {
    role: string,
    verificationComponentArray: any[],
    verificationId: string
}

class Verification extends React.Component<VerificationProps, VerificationState> {
    constructor(props: any) {
        super(props)
        this.state = {
            role: 'User',
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
                <Navbar />
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