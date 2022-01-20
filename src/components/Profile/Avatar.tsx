import React from 'react'
import styled, { CSSProperties } from 'styled-components'
import { FirebaseUser } from '../../types/FirebaseUser'
import { CgProfile } from 'react-icons/cg'
type AvatarProps = {
    firebaseUserData: FirebaseUser,
    dimension: number,
    isOnNavbar: boolean,
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
            width: ${this.props.dimension}px;
            height: ${this.props.dimension}px;
            border: 1px #FFFFFF solid;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: auto 0;
            margin-left: ${this.props.isOnNavbar ? '10px' : '4vh'};
        `
        const ProfileImg = styled.img`
            width: ${this.props.dimension}px;
            height: ${this.props.dimension}px;
            border: 1px #FFFFFF solid;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: auto 0;
        `
        return (
            <AvatarWrapper>
                {this.props.firebaseUserData.profilePictureURL != undefined ? <ProfileImg src={this.props.firebaseUserData.profilePictureURL} /> : <CgProfile size={`${this.props.dimension}px`}></CgProfile>}
            </AvatarWrapper>
        )
    }
}

export default Avatar