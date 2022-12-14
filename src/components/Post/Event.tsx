import React from 'react';
import styled from 'styled-components'
import TextInput from "./TextInput"
import Checkbox from './Checkbox'
import { User } from '../../types/User';
import crypto from 'crypto-js'
import AttachmentInput from './AttachmentInput';

const Wrapper = styled.div`
    width: 70%;
    font-weight: 800;
    font-size: 13px;
    order: 2;
    word-wrap: break-word;
    overflow: scroll;
    line-height: 29px;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`
const Description = styled.p`
    font-size: 15px;
    word-break: keep-all;
    white-space: pre-wrap;
`
const Submit = styled.button`
    width: 120px;
    height: 50px;
    background-color: #BDA06D;
    font-weight: 700;
    font-size: 15px;
    color: white;
    margin-top: 30px;
`
const LoadingBlocker = styled.div`
    opacity: 0.5;
    background-color: black;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100000;
`
const LoadingText = styled.span`
    background-color: black;
    color: white;
    font-size: 16px;
    font-weight: 600;
`

type EventProps = {
    data: string,
    userData: User,
    title: string,
    postId: string,
}

type EventState = {
    data: any,
    inputs: any[],
    mounted: boolean,
    loading: boolean,
}

class Event extends React.Component<EventProps, EventState> {
    constructor(props: EventProps) {
        super(props);
        this.state = {
            data: JSON.parse('{}'),
            inputs: [],
            mounted: false,
            loading: false,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount = () => {
        if (this.props.data != "Content") {
            this.setState({
                data: JSON.parse(this.props.data)
            })
        }
    }

    static getDerivedStateFromProps = (newProps: EventProps, prevState: EventState) => {
        if (!prevState.mounted && newProps.data != "Content") {
            const newData = JSON.parse(newProps.data);
            const inputArray = [];
            for (let i = 0; i < newData.questions.length; i++) {
                inputArray.push("");
            }
            return {
                data: JSON.parse(newProps.data),
                inputs: inputArray,
                mounted: true,
            }
        }
    }

    handleChange = (index: number, content: any) => {
        const temp = [];
        for (let i = 0; i < this.state.inputs.length; i++) {
            temp.push(this.state.inputs[i])
        }
        temp[index] = content;
        this.setState({
            inputs: temp,
        })
    }

    setLoading = () => {
        this.setState({
            loading: true
        })
    }

    unsetLoading = () => {
        this.setState({
            loading: false
        })
    }

    checkRequired = () => {
        for (let i = 0; i < this.state.data.questions.length; i++) {
            if (this.state.data.questions[i].required && !this.state.inputs[i]) {
                return false;
            }
        }
        return true;
    }

    handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!this.checkRequired()) {
            window.alert("?????? ????????? ???????????? ??????????????????.")
            return;
        }
        if (!window.confirm("????????? ?????? ??? ?????? ????????? ?????? ????????? ???????????? ??????????????? ?????? ????????? ??? ??????????????????. ???????????? ???????????? ?????????????????????????")) {
            return;
        }
        const responseData: any = {}
        for (let i = 0; i < this.state.inputs.length; i++) {
            const question = this.state.data.questions[i].question
            responseData[question] = this.state.inputs[i]
        }
        const finalData = {
            responseData: JSON.stringify(responseData),
            post: parseInt(this.props.postId)
        }
        const url = process.env.REACT_APP_HOST + '/api/event/registerEvent'
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(finalData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.status == 200) {
            window.alert("????????? ????????? ??????????????? ?????????????????????. ?????????????????? ???????????????.")
            this.setState({
                loading: false,
            })
        }
        else if (response.status == 400) {
            window.alert("?????? ???????????? ??????????????????. ?????? ????????? ???????????????.")
            this.setState({
                loading: false,
            })
        }
        else {
            window.alert("????????? ????????? ??????????????????. ????????? ?????? ??????????????????")
            this.setState({
                loading: false,
            })
        }
    }

    render = () => {
        return (
            <>
                <Wrapper>
                    {this.state.loading ? <LoadingBlocker><LoadingText>?????? ??? ?????????! ????????? ?????????????????? : </LoadingText></LoadingBlocker> : <></>}
                    <Form>
                        <Description>{this.state.data.description}</Description>
                        {this.state.data.questions.map((element: any, index: number) => {
                            if (element.type == "text") {
                                return <TextInput question={element.question} handleChange={this.handleChange} index={index} isRequired={this.state.data.questions[index].required} />
                            }
                            else if (element.type == "checkbox") {
                                return <Checkbox question={element.question} handleChange={this.handleChange} index={index} isRequired={this.state.data.questions[index].required} />
                            }
                            else if (element.type == "file") {
                                return <AttachmentInput question={element.question} handleChange={this.handleChange} canApplyMultiple={this.state.data.canApplyMultiple} index={index} eventTitle={this.props.title} userData={this.props.userData} setLoading={this.setLoading} unsetLoading={this.unsetLoading} isRequired={this.state.data.questions[index].required} />
                            }
                        })}
                        <Submit onClick={this.handleSubmit}>??????</Submit>
                    </Form>
                </Wrapper>
            </>
        )
    }
}

export default Event;