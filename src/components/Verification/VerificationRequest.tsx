import React from 'react'
import styled from 'styled-components'
import { DisplayLarge, DisplaySmall } from '../../utils/ThemeText'

type VerificationProps = {
    isModal: Boolean
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
    }

    render = () => {
        const ModalWrapper = styled.div`
            position: absolute;
            width: 100vw;
            height: 100vh;
            overflow-y: hidden;
            background: rgba(0, 0, 0, 0.5);
            :before {
                background: rgba(0, 0, 0, 0.5);
            }
            z-index: 5;
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

        `

        return (
            <>
                {this.props.isModal === true && this.state.showModal ?
                    <ModalWrapper onClick={(e)=>{e.stopPropagation()}}>
                        <ModalContent>
                            <CloseButton onClick={this.onCloseClick}>X</CloseButton>
                            <DisplayLarge style={{ marginLeft: '10%', opacity: '0.7' }}>학생 인증</DisplayLarge>
                            <DisplaySmall style={{ opacity: '0.7' }}>Verify to get access to more boards and posts! </DisplaySmall>
                        </ModalContent>
                    </ModalWrapper>
                    :
                    <ContentWrapper>

                    </ContentWrapper>
                }
            </>
        )
    }

}

export default VerificationRequest