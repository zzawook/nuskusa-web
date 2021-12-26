import React from 'react'
import styled from 'styled-components'
import { FirebaseUser } from '../../types/FirebaseUser'
import { Headline } from '../../utils/ThemeText'
import Avatar from './Avatar'
import ProfileDisplay from './ProfileDisplay'

type BadgeProps = {
    firebaseUserData: FirebaseUser
}

type BadgeState = {
    isOpen: boolean
}

// Badge for top-right side of the navbar
class ProfileBadge extends React.Component<BadgeProps, BadgeState> {
    constructor(props: BadgeProps) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    closeProfileDisplay = () => {
        this.setState({
            isOpen: false
        })
    }

    openProfileDisplay = () => {
        this.setState({
            isOpen: true
        })
    }

    render = () => {
        const Wrapper = styled.div`
            display: flex;
            justify-content: center;
            flex-direction: row;
            cursor: pointer;
        `

        const ClickableDiv = styled.div`
            display: flex;
            flex-direction: row;
            cursor: pointer;
        `
        return (
            <Wrapper>
                <ClickableDiv onClick={this.openProfileDisplay}>
                    <Headline color="white" style={{ margin: 'auto' }}>
                        {this.props.firebaseUserData.username}
                    </Headline>
                    <Avatar firebaseUserData={this.props.firebaseUserData} dimension={32} isOnNavbar={true}/>
                </ClickableDiv>
                <ProfileDisplay firebaseUserData={this.props.firebaseUserData} onExitClick={this.closeProfileDisplay} isOpen={this.state.isOpen}></ProfileDisplay>
            </Wrapper>
        )
    }
}

export default ProfileBadge