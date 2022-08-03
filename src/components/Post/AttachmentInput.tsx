import React from 'react';
import styled from 'styled-components'
import { FirebaseUser } from '../../types/FirebaseUser';
import { storageService, dbService } from '../../utils/firebaseFunctions';
import crypto from 'crypto-js';
import { isExternalModuleNameRelative } from 'typescript';

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
    userdata: FirebaseUser,
    setLoading: Function,
    unsetLoading: Function,
    canApplyMultiple: boolean,
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

    handleFileInput = (event: any) => {
        event.preventDefault();
        const file = event.target.files[0]
        if (file) {
            if (file.size > 1048576 * 5) {
                window.alert("파일 크기는 5MB 이하여야 합니다. 파일 업로드를 취소합니다.")
                return;
            }
            else {
                this.props.setLoading();
                dbService.collection('events').doc(crypto.SHA256(this.props.eventTitle).toString().substring(0, 20)).collection("registrations").doc(this.props.userdata.userId).get().then((doc) => {
                    if (! this.props.canApplyMultiple && doc.exists) {
                        this.props.unsetLoading();
                        window.alert("이미 지원하신 이벤트입니다.")
                        return;
                    }
                    let ref = "event/" + this.props.eventTitle.substring(0, 20) + "/" + this.props.userdata.userId + "/Q" + this.props.index
                    if (this.props.canApplyMultiple) {
                        const tempNowDate = new Date();
                        ref += crypto.MD5(tempNowDate.toString())
                    }
                    const uploadTask = storageService.ref(ref).put(file)
                    uploadTask.then(() => {
                        storageService.ref(ref).getDownloadURL().then((url: string) => {
                            this.props.handleChange(this.props.index, url);
                            this.setState({
                                file: file,
                                fileUrl: url,
                            }, () => {
                                this.props.unsetLoading();
                            })
                        })
                    })
                })
            }
        }
    }

    render = () => {
        
        return (
            <Wrapper>
                <Question>{this.props.question}</Question>
                <Input type="file" onChange={this.handleFileInput}/>
            </Wrapper>
        )
    }
}

export default AttachmentInput;