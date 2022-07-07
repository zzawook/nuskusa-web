import React from 'react';
import styled from 'styled-components'
import Navbar from '../../components/Admin/Navbar';
import { FirebaseUser } from '../../types/FirebaseUser';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { authService, dbService } from "../../utils/firebaseFunctions";
import firebase from 'firebase';
import ShortInput from '../../components/Admin/AddEvent/ShortInput';
import Checkbox from "../../components/Admin/AddEvent/Checkbox"
import { textChangeRangeIsUnchanged } from 'typescript';

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
    background-color: grey;
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
const SubmitButton = styled.input`
    width: 60%;
    height: 63px;
    border: none;
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
type AdminVerificationProps = {
    firebaseUserData: FirebaseUser,
}

type AdminVerificationState = {
    title: string,
    description: string,
    loading: boolean,
    inputs: Array<any>,
    inputData: Array<any>
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
        }
        this.setLoading.bind(this);
        this.unsetLoading.bind(this);
    }

    addTextInput = () => {
        let inputs = this.state.inputs;
        inputs.push({
            'deleted': false,
            component: <ShortInput index={this.state.inputs.length} handleChange={this.handleChange} handleDelete={this.handleDelete}></ShortInput>
        })

        let inputData = this.state.inputData;
        inputData.push({
            "type": "text",
            "question": "",
        })
        this.setState({
            inputs: inputs
        });
    }

    addCheckbox = () => {
        let inputs = this.state.inputs;
        inputs.push({
            deleted: false,
            component: <Checkbox index={this.state.inputs.length} handleChange={this.handleChange} handleDelete={this.handleDelete}></Checkbox>
        })

        let inputData = this.state.inputData;
        inputData.push({
            "type": "checkbox",
            "question": ""
        })
        this.setState({
            inputs: inputs
        })
    }

    inputTypes = [
        {
            "name": "단답형 질문",
            "adderFunction": this.addTextInput,
        },
        {
            "name": "체크박스",
            "adderFunction": this.addCheckbox,
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

    handleSubmit = (event: any) => {
        event.preventDefault();
        if (this.state.title.trim() == "") {
            window.alert("이벤트 공지 제목을 입력해주세요");
            return;
        }
        if (this.state.description.trim() == "") {
            window.alert("이벤트 공지 내용을 입력해주세요");
            return;
        }

        const questionObject = [];
        for (let i = 0; i < this.state.inputData.length; i++) {
            if (this.state.inputData[i].question.trim() == "") {
                window.alert("질문 내용을 입력하지 않은 문항이 있습니다.")
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
        }
        const eventObject = {
            title: this.state.title,
            content: JSON.stringify(contentObject),
            isAnnonymous: false,
            isAnnouncement: true,
            isPinned: true,
            isHidden: true,//false,
            isEvent: true,
            lastModified: firebase.firestore.Timestamp.fromDate(new Date()),
            upvoteArray: [],
            numComments: 0,
            permissions: ["Admin", "Current"],
            author: this.props.firebaseUserData.username,
            authorId: authService.currentUser ? authService.currentUser.uid : null,

            parentBoardId: "announcement",
            parentBoardTitle: "공지게시판",
            parentColor: "#fc6565",
            parentTextColor: "#845858",
        }
        console.log(eventObject)
        dbService.collection('boards').doc('announcement').collection('posts').add(eventObject).then(docRef => {
            console.log("Added")
            this.setState({
                loading: false,
            }, () => {
                window.location.href = "#/boards/announcement/" + docRef.id
            })
        }).catch(err => {
            console.log(err)
            window.alert("오류가 발생했습니다. IT 담당자에게 문의해주세요.")
        })
    }

    render = () => {
        return (
            <>
                {this.state.loading ? <LoadingBlocker><LoadingText>거의 다 됐어요! 조금만 기다려주세요 : </LoadingText></LoadingBlocker> : <></>}
                <Wrapper>
                    <Navbar firebaseUserData={this.props.firebaseUserData} />
                    <Form>
                        <Input
                            name="username"
                            type="string"
                            placeholder="이벤트 공지 제목"
                            required
                            value={this.state.title}
                            onChange={(event: any) => this.setState({ title: event.target.value })}
                        >
                        </Input>
                        <Input
                            name="username"
                            type="string"
                            placeholder="이벤트 공지 설명"
                            required
                            value={this.state.description}
                            onChange={(event: any) => this.setState({ description: event.target.value })}
                        >
                        </Input>
                        <AddBar>{this.inputTypes.map(element => {
                            return <AddBox onClick={element.adderFunction}>{element.name} 추가</AddBox>
                        })}</AddBar>
                        {this.state.inputs.map(element => element.deleted ? <></> : element.component)}
                        <SubmitButton type="submit" value="이벤트 공지 올리기" onClick={this.handleSubmit}/>
                    </Form>
                </Wrapper>
            </>

        )
    }
}

export default AddEvent