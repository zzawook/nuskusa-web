import React from 'react';
import { handleInputChange } from 'react-select/dist/declarations/src/utils';
import styled from 'styled-components'
import TextInput from "./TextInput"
import Checkbox from './Checkbox'
import { FirebaseUser } from '../../types/FirebaseUser'
import { dbService } from '../../utils/firebaseFunctions';

const margin = 20;

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

`
const Submit = styled.button`
    width: 190px;
    height: 63px;
    background-color: #BDA06D;
    font-weight: 700;
    font-size: 17px;
    color: white;
`
const LoadingBlocker = styled.div`
    opacity: 0.5;
    background-color: black;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const LoadingText = styled.span`
    background-color: black;
    color: white;
    font-size: 16px;
    font-weight: 600;
`

type EventProps = {
    data: string,
    firebaseUserData: FirebaseUser,
    title: string,
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
        if (! prevState.mounted && newProps.data != "Content") {
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
        }, () => console.log(this.state.inputs))
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        let already = false;
        window.confirm("이벤트 지원은 인당 1회만 가능하며 추후 수정은 개별 연락을 통해서만 가능하오니 지원 내용을 잘 확인해주세요. 입력하신 내용으로 지원하시겠습니까?")
        dbService.collection("event").doc(this.props.title).collection("registrations").doc(this.props.firebaseUserData.userId).get().then(doc => {
            this.setState({
                loading: true,
            })
            if (doc.exists) {
                window.alert("이미 지원하신 이벤트입니다.")
                already = true;
                this.setState({
                    loading: false
                })
            }
        }).then(() => {
            if (! already) {
                const responseData: any = {}
                console.log(this.state.inputs.length)
                for (let i = 0; i < this.state.inputs.length; i++) {
                    const question = this.state.data.questions[i].question
                    responseData[question] = this.state.inputs[i]
                }
                const finalData = {
                    userData: JSON.stringify(this.props.firebaseUserData),
                    responseData: JSON.stringify(responseData),
                }
                dbService.collection("event").doc(this.props.title).collection("registrations").doc(this.props.firebaseUserData.userId).set(finalData).then(() => {
                    window.alert("이벤트 지원이 성공적으로 처리되었습니다. 지원해주셔서 감사합니다.")
                    this.setState({
                        loading: false,
                    })
                }).catch(err => {
                    console.log(err.message)
                    window.alert("이벤트 지원이 실패했습니다. 나중에 다시 시도해주세요. 에러코드:" + err)
                    this.setState({
                        loading: false,
                    })
                })
            }
            
        })
    }

    render = () => {
        return (
            <>
                {this.state.loading ? <LoadingBlocker><LoadingText>거의 다 됐어요! 조금만 기다려주세요 : </LoadingText></LoadingBlocker> : <></>}
                <Wrapper>
                    <Form>
                        <Description>{this.state.data.description}</Description>
                        {this.state.data.questions.map((element: any, index: number) => {
                            if (element.type == "text") {
                                return <TextInput question={element.question} handleChange={this.handleChange} index={index} />
                            }
                            else if (element.type == "checkbox") {
                                return <Checkbox question={element.question} handleChange={this.handleChange} index={index} />
                            }
                        })}
                        <Submit onClick={this.handleSubmit}>제출</Submit>
                    </Form>
                </Wrapper>
            </>
        )
    }
}

export default Event;