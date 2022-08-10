import React from 'react';
import styled from 'styled-components'

const margin = 20;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`
const Input = styled.input`
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    margin-bottom: ${margin}px;
    margin-right: 10px;
    height: 45px;
`
const QuestionDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`
const RequiredStar = styled.span`
    color: red;
    margin-left: 5px;
    line-height: 45px;
`
const Question = styled.span`
    margin-top: ${11}px;
    font-family: var(--font-family-roboto);
    font-weight: 700;
    font-size: 15px;
    outline: none;
    word-break: keep-all;
`

type TextInputProps = {
    question: string,
    handleChange: Function,
    index: number,
    isRequired: boolean,
}

type TextInputState = {
    checked: boolean,
}

class Checkbox extends React.Component<TextInputProps, TextInputState> {
    constructor(props: TextInputProps) {
        super(props);
        this.state = {
            checked: false,
        }
    }

    handleChange = (event: any) => {
        this.props.handleChange(this.props.index, !this.state.checked);
        this.setState({
            checked: !this.state.checked,
        })
    }

    render = () => {
        return (
            <Wrapper>
                <Input type="checkbox" onChange={this.handleChange} checked={this.state.checked} />
                <Question>{this.props.question}</Question>
                <RequiredStar>{this.props.isRequired ? "*" : ""}</RequiredStar>
            </Wrapper>

        )
    }
}

export default Checkbox;