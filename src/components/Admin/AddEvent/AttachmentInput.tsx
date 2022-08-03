import React from 'react';
import styled from 'styled-components'
import { storageService } from '../../../utils/firebaseFunctions';

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
    flex-direction: column;
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
    height: 45px;
    font-family: var(--font-family-roboto);
    font-weight: 700;
    font-size: 18px;
    outline: none;
    color: #B5B5B5;
    margin-top: 10px;
    margin-right: auto;
    margin-left: 10px;
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

type AttachmentInputProps = {
    index: number,
    handleChange: Function,
    handleDelete: Function,
    handleRequired: Function,
}

type AttachmentInputState = {
    index: number,
    isRequired: boolean,
}

class AttachmentInput extends React.Component<AttachmentInputProps, AttachmentInputState> {
    constructor(props: AttachmentInputProps) {
        super(props);
        this.state = {
            index: this.props.index,
            isRequired: false,
        }
    }

    handleChange = (event: any) => {
        this.props.handleChange(this.state.index, event?.target.value)
    }

    handleDelete = () => {
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
                        <Question type="text" onChange={this.handleChange} placeholder={"질문을 입력해주세요"}></Question>
                        <Input type="file" disabled={true}></Input>
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

export default AttachmentInput