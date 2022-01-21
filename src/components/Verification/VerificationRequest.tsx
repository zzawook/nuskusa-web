import React from 'react'
import styled from 'styled-components'
import { FirebaseUser } from '../../types/FirebaseUser'
import { DisplayLarge, DisplaySmall } from '../../utils/ThemeText'
import VerificationForm from './VerificationForm'

type VerificationProps = {
    isModal: Boolean,
    onClose: Function,
    firebaseUserData: FirebaseUser,
}

type VerificationState = {
    showModal: Boolean
}

class VerificationRequest extends React.Component<VerificationProps, VerificationState> {
    constructor(props: VerificationProps) {
        super(props)
        this.state = {
            showModal: true
        }
    }

    onCloseClick = () => {
        this.setState({
            showModal: false
        })
        this.props.onClose();
        localStorage.setItem("seeVerify", "no")
    }

    render = () => {
        const ModalWrapper = styled.div`
            position: fixed;
            top: -80px;
            width: 100vw;
            height: 200vh;
            overflow-y: clip;
            background: rgba(0, 0, 0, 0.5);
            z-index: 100;
        `
        const ModalContent = styled.div`
            display: flex;
            flex-direction: column;
            margin: 15vh auto;
            width: 50%;
            height: 70%;
            background: #FFFFFF;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
            z-index: 100;
        `
        const CloseButton = styled.button`
            display: flex;
            float: right;
            width: 30px;
            margin-right: 10px;
            margin-left: auto;
            margin-top: 10px;
            background: none;
            border: none;
            :hover {
                background: rgba(0, 0, 0, 0.5);
            }
            color: black;
            z-index: 100;
            text-align: center;
        `

        const ContentWrapper = styled.div`
            background: #FFFFFF;
            width: 70vw;
            margin: auto;
            z-index: 100;
        `
        return (
            <>
                {
                    !this.props.firebaseUserData.isVerified ?
                        !this.props.isModal ?
                            <ModalWrapper onClick={(e) => { e.stopPropagation() }}>
                                <ModalContent>
                                    <CloseButton onClick={this.onCloseClick}>X</CloseButton>
                                    <DisplayLarge color={"#000000"} style={{ marginLeft: '10%', opacity: '0.7' }}>학생 인증</DisplayLarge>
                                    <DisplaySmall color={"#000000"} style={{ opacity: '0.7' }}>Verify to get access to more boards and posts! </DisplaySmall>
                                    <VerificationForm />
                                </ModalContent>
                            </ModalWrapper>
                            :
                            <ContentWrapper>
                                <DisplayLarge color={"#000000"} style={{ marginLeft: '10%', opacity: '0.7', paddingTop: '5%' }}>학생 인증</DisplayLarge>
                                <DisplaySmall color={"#000000"} style={{ opacity: '0.7' }}>Verify to get access to more boards and posts! </DisplaySmall>
                                <VerificationForm />
                            </ContentWrapper>
                        :
                        <></>
                }
            </>

        )
    }

}

export default VerificationRequest