import React from "react";
import styled from 'styled-components';
import CSS from 'csstype'
import Primary from '../Post/PrimaryComment';
import { dbService } from '../../utils/firebaseFunctions'
import { FirebaseUser } from "../../types/FirebaseUser";
import firebase from 'firebase'

type CommentProps = {
    comments: any[],
    commentIds: any[],
    boardId: string,
    postId: string,
    firebaseUserData: FirebaseUser,
    reset: any,
}

type CommentState = {
    commentEntered: string,
    commentArray: JSX.Element[],
}

const Container = styled.div`
    order: 4;
    width: 70%;
    font-family: var(--font-family-roboto); 
`

const Divider = styled.div`
    border: none;
    border-top: 1px solid #5c5c5c;
    width: 100%;
    height: 0px;
    left: 0%;
    margin-top: 20px;
`
const Form = styled.form`
    position: relative;
    top: 30px;
    width: 100%;
`
const Input = styled.textarea`
    width: ${(window.innerWidth * 0.49) - 20}px;
    height: 70px;
    padding: 10px;
    background-color: #0B121C;
    border: 1px solid #9c9c9c;
    color: white;
    font-weight: bold;
    font-size: 14px;
    font-family: var(--font-family-roboto);
    resize: none;
`
const Cancel = styled.button`
    &:hover {
        color: white;
    }

    position: relative;
    right: 0px;
    margin-top: 10px;
    width: 100px;
    height: 35px;
    background-color: transparent;
    border: none;
    color: #858585;
    font-weight: bold;
    font-size: 16px;
    right: 0px;
`
const Submit = styled.button`
    :hover {
        border: 1px solid white;
    }

    position: relative;
    left: 0px;
    margin-top: 10px;
    width: 100px;
    height: 35px;
    background-color: #BDA06D;
    border: none;
    color: white;
    font-weight: bold;
    font-size: 16px;
`
const CommentBox = styled.div`
    position: relative;
    width: 100%;
    top: 50px;
`

class Comment extends React.Component<CommentProps, CommentState> {
    constructor(props: CommentProps) {
        super(props);
        this.state = {
            commentEntered: "",
            commentArray: [],
        }
    }

    componentDidMount() {
        console.log(this.props.comments)
        this.setState({
            commentArray: this.props.comments.map((element, i) => <Primary reset={this.props.reset} data={element} boardId={this.props.boardId} postId={this.props.postId} firebaseUserData={this.props.firebaseUserData} commentId={this.props.commentIds[i]}/>).reverse()
        })
    }

    static getDerivedStateFromProps(nextProps: CommentProps, prevState: CommentState) {
        return {
            commentArray: nextProps.comments.map((element, i) => <Primary reset={nextProps.reset} data={element} boardId={nextProps.boardId} postId={nextProps.postId} firebaseUserData={nextProps.firebaseUserData} commentId={nextProps.commentIds[i]}/>).reverse()
        }
    }

    render() {
        const handleCancelClick = (e: any) => {
            e.preventDefault()
            this.setState({
                commentEntered: ""
            })
        }
        const handleInputChange = (e: any) => {
            e.preventDefault();
            this.setState({
                commentEntered: e.target.value,
            })
        }
        const handleSubmitClick = (e: any) => {
            e.preventDefault();
            dbService
                .collection('boards').doc(this.props.boardId)
                .collection('posts').doc(this.props.postId)
                .collection('comments')
                .add({
                    author: this.props.firebaseUserData.username,
                    authorId: this.props.firebaseUserData.userId,
                    content: this.state.commentEntered,
                    isReply: false,
                    lastModified: firebase.firestore.Timestamp.fromDate(new Date()),
                    upvoteArray: [],
                    replies: [],
                    postId: this.props.postId,
                    boardId: this.props.boardId,
                    replyTo: null,
                })
            this.setState({
                commentEntered: ""
            })
        }

        return (
            <Container>
                <Divider />
                <Form>
                    <Input placeholder={'Reply...'} onChange={handleInputChange} value={this.state.commentEntered}/>
                    <Cancel onClick={handleCancelClick}>Cancel</Cancel>
                    <Submit onClick={handleSubmitClick}>Post</Submit>
                </Form>
                <CommentBox>
                    {this.state.commentArray}
                </CommentBox>
            </Container>
        )
    }
}

export default Comment;
