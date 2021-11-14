import React from 'react'
import styled, { CSSProperties } from 'styled-components'
import { FirebaseUser } from '../../types/FirebaseUser'
import { Headline } from '../../utils/ThemeText'

type AvatarProps = {
    firebaseUserData: FirebaseUser,
    style?: CSSProperties
}

type AvatarState = {

}

class Avatar extends React.Component<AvatarProps, AvatarState> {
    constructor(props: AvatarProps) {
        super(props)
        this.state = {

        }
    }

    componentDidMount = () => {

    }

    render = () => {
        const AvatarWrapper = styled.div`
            width: 32px;
            height: 32px;
            border: 1px #FFFFFF solid;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: auto 0;
            margin-left: 10px;
        `
        return (
            <AvatarWrapper>
                <Headline>
                    I
                </Headline>
            </AvatarWrapper>
        )
    }
}

export default Avatar