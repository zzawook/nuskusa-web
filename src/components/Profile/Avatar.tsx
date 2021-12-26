import React from 'react'
import styled, { CSSProperties } from 'styled-components'
import { FirebaseUser } from '../../types/FirebaseUser'
import { CgProfile } from 'react-icons/cg'
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
            border: 0.5px #FFFFFF solid;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: auto 0;
            margin-left: 10px;
        `
        return (
            <>
                {
                    this.props.firebaseUserData.profilePictureURL ?
                        <AvatarWrapper>
                            <img src={this.props.firebaseUserData.profilePictureURL} width='32px' height='32px'></img>
                        </AvatarWrapper>
                        :
                        <AvatarWrapper style={{border: "0px"}}>
                            <CgProfile size='32px'></CgProfile>
                        </AvatarWrapper>
                }
            </>
        )
    }
}

export default Avatar