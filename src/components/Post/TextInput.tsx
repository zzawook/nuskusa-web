import React from 'react';
import styled from 'styled-components'

const margin = 20;

const QuestionDiv = styled.div`
    display: flex;
    flex-direction: row;
`
const RequiredStar = styled.span`
    color: red;
    margin-left: 5px;
    line-height: 45px;
`
const Input = styled.input`
    border: none;
    border-bottom: 1px solid white;
    margin-bottom: ${margin}px;
    padding: 10px;
    background-color: transparent;
    width: 60%;
    height: 30px;
    font-family: var(--font-family-roboto);
    font-weight: 700;
    font-size: 15px;
    outline: none;
    color: white;
`

type TextInputProps = {
    question: string,
    handleChange: Function,
    index: number,
    isRequired: boolean,
}

type TextInputState = {
    input: string,
}

class TextInput extends React.Component<TextInputProps, TextInputState> {
    constructor(props: TextInputProps) {
        super(props);
        this.state = {
            input: "",
        }
    }

    handleChange = (event: any) => {
        this.props.handleChange(this.props.index, event.target.value);
    }

    render = () => {
        return (
            <QuestionDiv>
                <Input type="text" onChange={this.handleChange} placeholder={this.props.question}></Input>
                <RequiredStar>{this.props.isRequired ? "*" : ""}</RequiredStar>
            </QuestionDiv>
            
        )
    }
}

export default TextInput;