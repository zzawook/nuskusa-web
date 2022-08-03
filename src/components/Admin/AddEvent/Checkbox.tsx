import React from 'react';
import styled from 'styled-components'

const margin = 20;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 15px;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    justify-content: center;
    align-items: center;
`
const Inner = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const Question = styled.input`
    border: 1px solid grey;
    width: 95%;
    height: 45px;
    font-size: 18px;
    font-weight: 800;
`
const Input = styled.input`
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    //margin-bottom: ${margin}px;
    width: 5%;
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
    color: red;
    margin-left: auto;

    :hover {
        text-decoration: underline;
        cursor: pointer;
    }
`
type CheckboxProps = {
    index: number,
    handleChange: Function,
    handleDelete: Function,
    handleRequired: Function,
}

type CheckboxState = {
    title: string,
    index: number,
    isRequired: boolean,
}

class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    constructor(props: CheckboxProps) {
        super(props);
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
            isRequired: !this.state.isRequired
        }, () => {
            this.props.handleRequired(this.props.index, this.state.isRequired)
        })
    }


    render = () => {
        return (
            <Wrapper>
                <Container>
                    <Inner>
                        <Input type="checkbox" disabled={true} placeholder={"단답형 텍스트 답변"}></Input>
                        <Question type="text" onChange={this.handleChange} placeholder={"질문을 입력해주세요"}></Question>
                    </Inner>
                    <QuestionOptions>
                        <RequiredDiv>
                            <Required type="checkbox" checked={this.state.isRequired} onChange={this.handleRequired} />
                            <RequiredDescription>필수 질문</RequiredDescription>
                        </RequiredDiv>
                        <Delete onClick={this.handleDelete}>질문 삭제</Delete>
                    </QuestionOptions>
                </Container>
                
            </Wrapper>
        )
    }
}

export default Checkbox;