import React from 'react'
import Navbar from '../components/Navbar'
import VerificationComponent from '../components/Verification/VerificationComponent'
import { User } from '../types/User'
import { FirestoreUserVerification } from '../types/FirestoreUserVerification'
import { authService, dbService } from '../utils/firebaseFunctions'

type VerificationProps = {
    userData: User
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
                .onSnapshot((querySnapshot: { empty: any; docs: any[] }) => {
                    if (!querySnapshot.empty) {
                        const arr = querySnapshot.docs.map((element: { data: () => FirestoreUserVerification; id: string }) => {
                            const data = element.data() as FirestoreUserVerification
                            return (
                                <VerificationComponent
                                    key={element.id}
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
                <Navbar userData={this.props.userData} />
                {this.props.userData.role.toLowerCase() === 'admin' ?
                    <div>
                        You are an administrator. <br />
                        1. 신청인 이름 확인, 입학연도, 과 확인 <br />
                        2. 신청인 이름과 학생증/재학 증명서/졸업 증명서 상의 이름과 대조 <br />
                        3. 이상 없을 시에 Accept하기. 이상이 있다면 이유를 적고 Reject하기 <br />
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