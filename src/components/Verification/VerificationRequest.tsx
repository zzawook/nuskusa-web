import React from 'react'
import styled from 'styled-components'
import { authService } from '../../utils/firebaseFunctions'
import { DisplayLarge, DisplaySmall } from '../../utils/ThemeText'
import VerificationForm from './VerificationForm'

type VerificationProps = {
    isModal: Boolean,
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
        localStorage.setItem("seeVerify", "no")
    }

    render = () => {
        const ModalWrapper = styled.div`
            position: fixed;
            width: 100vw;
            height: 100vh;
            overflow-y: clip;
            background: rgba(0, 0, 0, 0.5);
            z-index: 20;
        `
        const ModalContent = styled.div`
            display: flex;
            flex-direction: column;
            margin: 15vh auto;
            width: 50%;
            height: 70%;
            background: #FFFFFF;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
        `
        const CloseButton = styled.button`
            display: inline;
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
        `

        const ContentWrapper = styled.div`
            background: #FFFFFF;
            width: 70vw;
            margin: auto;
        `
        return (
            <>
                {this.props.isModal === true && this.state.showModal && authService.currentUser ?
                    <ModalWrapper onClick={(e) => { e.stopPropagation() }}>
                        <ModalContent>
                            <CloseButton onClick={this.onCloseClick}>X</CloseButton>
                            <DisplayLarge style={{ marginLeft: '10%', opacity: '0.7' }}>학생 인증</DisplayLarge>
                            <DisplaySmall style={{ opacity: '0.7' }}>Verify to get access to more boards and posts! </DisplaySmall>
                            <VerificationForm />
                        </ModalContent>
                    </ModalWrapper>
                    :
                    <ContentWrapper>
                        <DisplayLarge style={{ marginLeft: '10%', opacity: '0.7', paddingTop: '5%' }}>학생 인증</DisplayLarge>
                        <DisplaySmall style={{ opacity: '0.7' }}>Verify to get access to more boards and posts! </DisplaySmall>
                        <VerificationForm />
                    </ContentWrapper>
                }
            </>
        )
    }

}

export default VerificationRequest