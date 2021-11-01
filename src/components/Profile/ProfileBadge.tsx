import React from 'react'
import styled from 'styled-components'
import { FirebaseUser } from '../../types/FirebaseUser'
import { Headline } from '../../utils/ThemeText'

type BadgeProps = {
    firebaseUserData: FirebaseUser
}

type BadgeState = {

}

// Badge for top-right side of the navbar
class ProfileBadge extends React.Component<BadgeProps, BadgeState> {
    constructor(props: BadgeProps) {
        super(props)
        this.state = {

        }
    }

    render = () => {
        const Wrapper = styled.div`
            display: flex;
            justify-content: center;
            flex-direction: column;
        `
        return (
            <Wrapper>
                {/* Avatar here */}
                <Headline color="white" style={{ marginLeft: '0px', marginRight: '0px', marginTop: '16px', marginBottom: '0px'}}>
                    {this.props.firebaseUserData.username}
                </Headline>
            </Wrapper >
        )
    }
}

export default ProfileBadge