import React from 'react'
import styled, { keyframes } from 'styled-components'
import { FirebaseUser } from '../../types/FirebaseUser'
import { Headline } from '../../utils/ThemeText'
import Avatar from './Avatar'

type ProfileDisplayProps = {
    firebaseUserData: FirebaseUser,
    isOpen: boolean
    onExitClick: any
}

type ProfileDisplayState = {
    isVisible: boolean,
}

class ProfileDisplay extends React.Component<ProfileDisplayProps, ProfileDisplayState> {
    constructor(props: ProfileDisplayProps) {
        super(props)
        this.state = {
            isVisible: false
        }
    }

    render = () => {
        const fadeIn = keyframes`
            from {
                opacity: 0;
            };
            to {
                transform: scale(1);
                opacity: 1;
            };
        `;

        const fadeOut = keyframes`
            from {
                transform: scale(1);
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        `;

        const Wrapper = styled.div`
            position: fixed;
            display: flex;
            flex-direction: column;
            cursor: default;
            z-index: 99;
            background-color: #0b123c;
            visibility: ${() => this.props.isOpen ? 'visible' : 'hidden'};
            animation: ${() => this.props.isOpen ? fadeIn : fadeOut} 0.1s linear;
            transition: visibility 0.1s linear;
        `
        const ProfileDisplayWrapper = styled.div`
            width: 425px;
            height: 600px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: 20px;
        `
        const ProfileDisplayEmpty = styled.div`
            display: none;
        `
        const CloseButton = styled.button`
        `
        return (
            <>
                <Wrapper>
                    <CloseButton onClick={this.props.onExitClick}>Close</CloseButton>
                    <ProfileDisplayWrapper>
                        <Avatar firebaseUserData={this.props.firebaseUserData} />
                        <Headline color="white">
                            {this.props.firebaseUserData.username}
                        </Headline>
                    </ProfileDisplayWrapper>
                </Wrapper>

            </>

        )
    }
}

export default ProfileDisplay