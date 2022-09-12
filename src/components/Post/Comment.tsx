import React from "react";
import styled from 'styled-components';
import Primary from '../Post/PrimaryComment';
import { dbService } from '../../utils/firebaseFunctions'
import { User } from "../../types/User";
import firebase from 'firebase'

type CommentProps = {
    boardId: string,
    postId: string,
    userData: User,
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
        this.fetchComment()
    }

    static getDerivedStateFromProps(nextProps: CommentProps, prevState: CommentState) {
    }

    generateComponent(elements: any[]) {
        return elements.map((element, i) => <Primary reset={this.props.reset} data={element} boardId={this.props.boardId} postId={this.props.postId} userData={this.props.userData} commentId={element.id} />)
    }

    fetchComment = async () => {
        const url = process.env.REACT_APP_HOST + "/api/post/getPostComments/" + this.props.postId;
        const response = await fetch(url, {
            method: "GET"
        })

        if (response.status == 200) {
            const comments = await response.json()
            const commentArray = [];
            for (let i = 0; i < comments.length; i++) {
                let comment = comments[i];
                let commentObject = {
                    id: comment.id,
                    author: comment.author,
                    content: comment.content,
                    upvoteCount: comment.upvoteCount,
                    upvoted: comment.upvoted,
                    postId: comment.post,
                    lastModified: new Date(comment.updatedAt),
                    replyTo: comment.replyTo,
                    isMine: comment.isMine,
                }
                commentObject.lastModified.setHours(commentObject.lastModified.getHours() - 8);
                commentArray.push(commentObject)
            }
            console.log(commentArray)
            this.setState({
                commentArray: this.generateComponent(commentArray),
            })
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
        const handleSubmitClick = async (e: any) => {
            e.preventDefault();
            const url = process.env.REACT_APP_HOST + "/api/post/addComment/" + this.props.postId
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    content: this.state.commentEntered,
                    replyTo: null,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (response.status == 201) {
                this.setState({
                    commentEntered: ""
                }, () => {
                    this.fetchComment();
                })
                
            }
            else {
                window.alert("댓글 작성에 실패했습니다.")
            }
        }

        return (
            <Container>
                <Divider />
                <Form>
                    <Input placeholder={'Reply...'} onChange={handleInputChange} value={this.state.commentEntered} />
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
