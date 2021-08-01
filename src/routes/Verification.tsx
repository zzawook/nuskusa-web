import React from 'react'
import { authService, dbService } from '../utils/firebaseFunctions'

type VerificationState = {
    role: string,
    verificationComponentArray: any[]
}

class Verification extends React.Component<{}, VerificationState> {
    constructor(props: any) {
        super(props)
        this.state = {
            role: 'User',
            verificationComponentArray: []
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
                                <div> 
                                    <img src={element.data().downloadURL} alt='' /> <br />
                                    Submitted by {element.data().owner} <br />
                                    <button>Accept</button>  <button>Reject</button>
                                </div>
                            )
                        })
                        this.setState({
                            verificationComponentArray: arr
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