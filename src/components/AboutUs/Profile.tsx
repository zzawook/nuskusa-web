import { pseudoRandomBytes } from 'crypto';
import React from 'react';
import styled from 'styled-components'

type AboutUsProps = {
    top: number,
    left: number,
    right: number,
    bottom: number,
    name: string,
    role: string,
}

type AboutUsState = {
    isTop: boolean,
    isLeft: boolean,
    top: number,
    left: number,
    right: number,
    bottom: number
}

const width = window.innerWidth;
const height = window.innerHeight;

const Name = styled.span`
    position: absolute;
    left: 30px;
    top: 30px;
    font-size: 22px;
    font-weight: 800;
    color: #383838;
`
const Role = styled.span`
    position: absolute;
    left: 30px;
    top: 80px;
    font-size: 13px;
    font-weight: 800;
    color: #737373;
`

class Profile extends React.Component<AboutUsProps, AboutUsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isTop: true,
            isLeft: true,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        }
    }

    componentDidMount() {
        if (this.props.top < 0) {
            this.setState({
                isTop: false,
                bottom: this.props.bottom
            })
        }
        else {
            this.setState({
                top: this.props.top,
            })
        }
        if (this.props.left < 0) {
            this.setState({
                isLeft: false,
                right: this.props.right,
            })
        }
        else {
            this.setState({
                left: this.props.left,
            })
        }

        
    }

    render = () => {
        const Container = styled.div`
            position: absolute;
            ${this.state.isTop ?  'top : ' + this.state.top.toString() + 'px' : 'bottom: ' + this.state.bottom.toString() + 'px'};
            ${this.state.isLeft ? 'left: ' + this.state.left.toString() + 'px': 'right: ' + this.state.right.toString() + 'px'};
            background-color: white;
            border: none;
            width: ${0.15 * width}px;
            height: ${0.18 * height}px;
        `
        return (
            <Container>
                <Name>{this.props.name}</Name>
                <Role>{this.props.role}</Role>
            </Container>

        )
    }
}

export default Profile