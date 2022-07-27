import React from 'react';
import styled from 'styled-components'

type ButtonProps = {
    color: string,
    title: string,
    description: string,
    linkTo: string
}

type ButtonState = {
    onHover: boolean,
}

class Button extends React.Component<ButtonProps, ButtonState> {
    constructor(props: ButtonProps) {
        super(props);
        this.state = {
            onHover: false,
        }
    }

    render() {
        const Container = styled.div`
            width: 15vw;
            height: 15vh;
            padding: 50px;
            background-color: ${this.state.onHover ? this.props.color : 'white'};
            border: ${'2px solid ' + this.props.color};
            margin-left: 2vw;
            margin-top: 2vw;
            margin-right: 2vw;
            margin-bottom: 2vw;
            display: flex;
            flex-direction: column;
            cursor: pointer;
        `

        const Title = styled.span`
            color: ${this.state.onHover ? 'white' : 'black'};
            font-size: 19px;
            font-weight: 700;
            margin-bottom: 30px;
        `

        const Description = styled.span`
            color: ${this.state.onHover ? 'white' : 'black'};
            font-size: 14px;
            font-weight: bold;
            margin-top: auto;
            margin-bottom: 40px;
            word-break: keep-all;
        `

        return (
            <Container onMouseEnter={() => this.setState({
                onHover: true
            })} onMouseLeave={() => this.setState({
                onHover: false
            })} onClick={() => {
                window.location.href = "/#/signup/" + this.props.linkTo
            }}>
                <Title>
                    {this.props.title}
                </Title>
                <Description>
                    {this.props.description}
                </Description>
            </Container>
        )
    }
}

export default Button