import React from 'react';
import styled from 'styled-components'
import { User } from '../../types/User';
import crypto from 'crypto-js';

const margin = 20;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
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
`
const RequiredStar = styled.span`
    color: red;
    line-height: 45px;
    margin-left: 5px;
`
const Question = styled.span`
    margin-top: ${11}px;
    font-family: var(--font-family-roboto);
    font-weight: 700;
    font-size: 15px;
    outline: none;
    word-break: keep-all;
`
type AttachmentInputProps = {
    question: string,
    handleChange: Function,
    index: number,
    eventTitle: string,
    userData: User,
    setLoading: Function,
    unsetLoading: Function,
    canApplyMultiple: boolean,
    isRequired: boolean,
}

type AttachmentInputState = {
    file: File | undefined,
    fileUrl: string,
}

class AttachmentInput extends React.Component<AttachmentInputProps, AttachmentInputState> {
    constructor(props: AttachmentInputProps) {
        super(props);
        this.state = {
            file: undefined,
            fileUrl: "",
        }
    }

    handleFileInput = async (event: any) => {
        event.preventDefault();
        const file = event.target.files[0]
        if (file) {
            if (file.size > 1048576 * 5) {
                window.alert("파일 크기는 5MB 이하여야 합니다. 파일 업로드를 취소합니다.")
                return;
            }
            else {
                this.props.setLoading();
                let ref = this.props.eventTitle.substring(0, 20) + "_" + this.props.userData.email + "_Q" + this.props.index
                if (this.props.canApplyMultiple) {
                    const tempNowDate = new Date();
                    ref += crypto.MD5(tempNowDate.toString())
                }
                const url = process.env.REACT_APP_HOST + "/api/event/uploadAttachment/" + ref
                const formData = new FormData()
                formData.append("file", file)
                const response = await fetch(url, {
                    method: "POST",
                    body: formData,
                })
                let imageUrl = ""
                if (response.status == 200) {
                    const json = await response.json()
                    imageUrl = json.url
                }
                this.props.handleChange(this.props.index, imageUrl);
                this.setState({
                    file: file,
                    fileUrl: imageUrl,
                }, () => {
                    this.props.unsetLoading();
                })
            }
        }
    }

    render = () => {

        return (
            <Wrapper>
                <QuestionDiv>
                    <Question>{this.props.question}</Question>
                    <RequiredStar>{this.props.isRequired ? "*" : ""}</RequiredStar>
                </QuestionDiv>

                <Input type="file" onChange={this.handleFileInput} />
            </Wrapper>
        )
    }
}

export default AttachmentInput;