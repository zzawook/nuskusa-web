import React from 'react'
import styled from 'styled-components'
import { FirebaseUser } from '../../types/FirebaseUser'
import { Headline } from '../../utils/ThemeText'
import Avatar from './Avatar'

type ProfileDisplayProps = {
    firebaseUserData: FirebaseUser,
    isOpen: boolean
    onExitClick: any
}

type ProfileDisplayState = {
}

class ProfileDisplay extends React.Component<ProfileDisplayProps, ProfileDisplayState> {
    constructor(props: ProfileDisplayProps) {
        super(props)
        this.state = {

        }
    }

    render = () => {
        const Wrapper = styled.div`
            position: fixed;
            display: flex;
            flex-direction: column;
            cursor: default;
            z-index: 99;
            background-color: #0b123c;
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
                {
                    this.props.isOpen ?
                        <Wrapper>
                            <CloseButton onClick={this.props.onExitClick}>Close</CloseButton>
                            <ProfileDisplayWrapper>
                                <Avatar firebaseUserData={this.props.firebaseUserData} style={{marginTop: '100px'}} />
                                <Headline color="white">
                                    {this.props.firebaseUserData.username}
                                </Headline>
                            </ProfileDisplayWrapper>
                        </Wrapper>
                        :
                        <ProfileDisplayEmpty />
                }
            </>

        )
    }
}

export default ProfileDisplay