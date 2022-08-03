import React from 'react';
import styled from 'styled-components'


const margin = 20

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 15px;
`
const Question = styled.input`
    border: 1px solid grey;
    width: 60%;
    height: 45px;
    font-size: 18px;
    font-weight: 800;
`
const Input = styled.input`
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    margin-bottom: ${margin}px;
    width: 60%;
    height: 45px;
    font-family: var(--font-family-roboto);
    font-weight: 700;
    font-size: 18px;
    outline: none;
    color: grey;
`
const QuestionOptions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 60%;
`
const RequiredDiv = styled.div`
`
const Required = styled.input`
    
`
const RequiredDescription = styled.span`
    color: black;
`
const Delete = styled.span`
    margin-left: auto;
    margin-right: 20%;

    color: red;

    :hover {
        text-decoration: underline;
        cursor: pointer;
    }
`
type ShortInputProps = {
    handleChange: Function,
    handleDelete: Function,
    handleRequired: Function,
    index: number,
}
type ShortInputState = {
    title: string,
    index: number,
    isRequired: boolean,
}

class ShortInput extends React.Component<ShortInputProps, ShortInputState> {
    constructor(props: ShortInputProps) {
        super(props)
        this.state = {
            title: "",
            index: this.props.index,
            isRequired: false,
        }
    }

    handleChange = (event: any) => {
        this.props.handleChange(this.state.index, event.target.value)
    }

    handleDelete = (event: any) => {
        this.props.handleDelete(this.state.index);
    }

    handleRequired = (event: any) => {
        this.setState({
            isRequired: ! this.state.isRequired
        }, () => {
            this.props.handleRequired(this.props.index, this.state.isRequired)
        })
    }

    render = () => {
        

        return (
            <Wrapper>
                <Question type="text" onChange={this.handleChange} placeholder={"질문을 입력해주세요"}></Question>
                <Input type="text" disabled={true} placeholder={"단답형 텍스트 답변"}></Input>
                <QuestionOptions>
                    <RequiredDiv>
                        <Required type="checkbox" checked={this.state.isRequired} onChange={this.handleRequired}/>
                        <RequiredDescription>필수 질문</RequiredDescription>
                    </RequiredDiv>
                    <Delete onClick={this.handleDelete}>질문 삭제</Delete>
                </QuestionOptions>
                
            </Wrapper>
            
        )
    }
}

export default ShortInput;