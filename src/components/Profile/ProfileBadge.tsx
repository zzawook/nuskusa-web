import React from 'react'
import styled from 'styled-components'
import { User } from '../../types/User'
import { Headline } from '../../utils/ThemeText'
import Avatar from './Avatar'
import ProfileDisplay from './ProfileDisplay'

type BadgeProps = {
    userData: User
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
                        {this.props.userData.username}
                    </Headline>
                    <Avatar userData={this.props.userData} dimension={32} isOnNavbar={true} />
                </ClickableDiv>
                <ProfileDisplay userData={this.props.userData} onExitClick={this.closeProfileDisplay} isOpen={this.state.isOpen}></ProfileDisplay>
            </Wrapper>
        )
    }
}

export default ProfileBadge