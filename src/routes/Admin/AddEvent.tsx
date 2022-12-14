import React from 'react';
import styled from 'styled-components'
import Navbar from '../../components/Admin/Navbar';
import { User } from '../../types/User';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ShortInput from '../../components/Admin/AddEvent/ShortInput';
import Checkbox from "../../components/Admin/AddEvent/Checkbox";
import AttachmentInput from "../../components/Admin/AddEvent/AttachmentInput";

const width = window.innerWidth;
const height = window.innerHeight;
const margin = 20;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: #18202B;
    justify-content: center;
    align-items: center;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60vw;
    height: 100vh;
    background-color: white;
`
const AddBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 100%;
    margin-bottom: 10px;
`
const AddBox = styled.div`
    color: black;
    margin: 15px;
    cursor: pointer;
    border: 1px solid black;
    padding: 10px;

    :hover {
        text-decoration: underline;
    }
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
`
const Description = styled.textarea`
    resize: none;
    border: 1px solid rgba(0, 0, 0, 0.3);
    margin-bottom: ${margin}px;
    width: 60%;
    min-height: 200px;
    font-family: var(--font-family-roboto);
    font-weight: 700;
    font-size: 18px;
    outline: none;
`
const SubmitButton = styled.input`
    width: 60%;
    height: 63px;
    border: none;
    margin-top: ${margin}px;
    margin-bottom: ${margin}px;
    background-color: #BDA06D;
    color: white;
    font-weight: 700;
    font-size: 22px;
    font-family: var(--font-family-roboto);
    cursor: pointer;
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
const HorizontalDivider = styled.hr`
    border: 1px solid grey;
    width: 60%;
`
const CanApplyMultipleDiv = styled.div`
    display: flex;
    flex-direction: row;
`
const CanApplyMultiple = styled.input`
    
`
const CanApplyMultipleDescription = styled.span`
    color: black;
`
type AdminVerificationProps = {
    userData: User,
}

type AdminVerificationState = {
    title: string,
    description: string,
    loading: boolean,
    inputs: Array<any>,
    inputData: Array<any>,
    required: Array<any>,
    canApplyMultiple: boolean,
}

class AddEvent extends React.Component<AdminVerificationProps, AdminVerificationState> {
    constructor(props: AdminVerificationProps) {
        super(props);
        this.state = {
            title: "",
            description: "",
            loading: false,
            inputs: [],
            inputData: [],
            required: [],
            canApplyMultiple: false,
        }
        this.setLoading.bind(this);
        this.unsetLoading.bind(this);
    }

    addTextInput = () => {
        let inputs = this.state.inputs;
        inputs.push({
            'deleted': false,
            component: <ShortInput index={this.state.inputs.length} handleChange={this.handleChange} handleDelete={this.handleDelete} handleRequired={this.handleRequired}></ShortInput>
        })

        let inputData = this.state.inputData;
        inputData.push({
            "type": "text",
            "question": "",
            "required": false,
        })
        this.setState({
            inputs: inputs
        });
    }

    addCheckbox = () => {
        let inputs = this.state.inputs;
        inputs.push({
            deleted: false,
            component: <Checkbox index={this.state.inputs.length} handleChange={this.handleChange} handleDelete={this.handleDelete} handleRequired={this.handleRequired}></Checkbox>
        })

        let inputData = this.state.inputData;
        inputData.push({
            "type": "checkbox",
            "question": "",
            "required": false,
        })
        this.setState({
            inputs: inputs
        })
    }

    addAttachmentInput = () => {
        let inputs = this.state.inputs;
        inputs.push({
            deleted: false,
            component: <AttachmentInput index={this.state.inputs.length} handleChange={this.handleChange} handleDelete={this.handleDelete} handleRequired={this.handleRequired}></AttachmentInput>
        })

        let inputData = this.state.inputData;
        inputData.push({
            "type": "file",
            "question": "",
            "required": false,
        })
        this.setState({
            inputs: inputs,
        })
    }

    handleCanApplyMultipleChange = (event: any) => {
        this.setState({
            canApplyMultiple: !this.state.canApplyMultiple
        })
    }

    inputTypes = [
        {
            "name": "????????? ??????",
            "adderFunction": this.addTextInput,
        },
        {
            "name": "????????????",
            "adderFunction": this.addCheckbox,
        },
        {
            "name": "????????????",
            "adderFunction": this.addAttachmentInput,
        }
    ]

    handleChange = (index: number, content: string) => {
        let inputData = this.state.inputData;
        inputData[index]["question"] = content;

        this.setState({
            inputData: inputData
        })
    }

    handleDelete = (index: number) => {
        let inputData = this.state.inputData;
        inputData[index].type = "deleted";
        let inputs = this.state.inputs;
        inputs[index].deleted = true;

        this.setState({
            inputs: inputs,
            inputData: inputData,
        })
    }

    handleRequired = (index: number, isRequred: boolean) => {
        let inputData = this.state.inputData;
        inputData[index]["required"] = isRequred;

        this.setState({
            inputData: inputData,
        })
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    setLoading = () => {
        this.setState({
            loading: true,
        })
    }

    unsetLoading = () => {
        this.setState({
            loading: false,
        })
    }

    static getDerivedStateFromProps(newProps: AdminVerificationProps, prevState: AdminVerificationState) {
        return {
        }
    }

    handleSubmit = async (event: any) => {
        event.preventDefault();
        if (this.state.title.trim() == "") {
            window.alert("????????? ?????? ????????? ??????????????????");
            return;
        }
        if (this.state.description.trim() == "") {
            window.alert("????????? ?????? ????????? ??????????????????");
            return;
        }

        const questionObject = [];
        for (let i = 0; i < this.state.inputData.length; i++) {
            if (this.state.inputData[i].question.trim() == "") {
                window.alert("?????? ????????? ???????????? ?????? ????????? ????????????.")
                return;
            }
            if (this.state.inputData[i].type != 'deleted') {
                questionObject.push(this.state.inputData[i]);
            }
        }
        this.setState({
            loading: true,
        })

        const contentObject = {
            description: this.state.description,
            questions: questionObject,
            canApplyMultiple: this.state.canApplyMultiple,
        }
        const eventObject = {
            title: this.state.title,
            content: JSON.stringify(contentObject),
            isAnnonymous: false,
            isAnnouncement: true,
            isPinned: true,
            isHidden: true,//false,
            isEvent: true,
        }
        const url = process.env.REACT_APP_HOST + '/api/event/addEvent'
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(eventObject),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if (response.status == 201) {
            const postId = await response.text()
            this.setState({
                loading: false,
            })
            window.alert("????????? ????????? ?????????????????????.")
            window.location.href = "#/boards/announcement/" + postId;
        }
        else {
            this.setState({
                loading: false
            })
            window.alert("????????? ?????? ??? ????????? ??????????????????.")
        }
    }

    render = () => {
        return (
            <>
                {this.state.loading ? <LoadingBlocker><LoadingText>?????? ??? ?????????! ????????? ?????????????????? : </LoadingText></LoadingBlocker> : <></>}
                <Wrapper>
                    <Navbar userData={this.props.userData} />
                    <Form>
                        <Input
                            name="name"
                            type="string"
                            placeholder="????????? ?????? ??????"
                            required
                            value={this.state.title}
                            onChange={(event: any) => this.setState({ title: event.target.value })}
                        >
                        </Input>
                        <Description
                            name="description"
                            placeholder="????????? ?????? ??????"
                            required
                            value={this.state.description}
                            onChange={(event: any) => this.setState({ description: event.target.value })}
                        >
                        </Description>
                        <AddBar>{this.inputTypes.map(element => {
                            return <AddBox onClick={element.adderFunction}>{element.name} ??????</AddBox>
                        })}</AddBar>
                        {this.state.inputs.map(element => element.deleted ? <></> : element.component)}
                        <HorizontalDivider />
                        <CanApplyMultipleDiv>
                            <CanApplyMultiple onChange={this.handleCanApplyMultipleChange} type="checkbox" checked={this.state.canApplyMultiple} />
                            <CanApplyMultipleDescription>?????? ?????? ??????</CanApplyMultipleDescription>
                        </CanApplyMultipleDiv>
                        <SubmitButton type="submit" value="????????? ?????? ?????????" onClick={this.handleSubmit} />
                    </Form>
                </Wrapper>
            </>

        )
    }
}

export default AddEvent