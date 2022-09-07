import React from 'react'
import styled from 'styled-components'
import { User } from '../../types/User'
import { CgProfile } from 'react-icons/cg'
type AvatarProps = {
    src: string | undefined,
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

    componentDidUpdate() {
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
                {this.props.src ? <ProfileImg src={this.props.src} /> : <CgProfile size={`${this.props.dimension}px`}></CgProfile>}
            </AvatarWrapper>
        )
    }
}

export default Avatar