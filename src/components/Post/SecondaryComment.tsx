import React from "react";
import styled from 'styled-components';
import { FirestoreComment } from '../../types/FirestoreComment'
import { FirebaseUser } from "../../types/FirebaseUser";
import { dbService } from '../../utils/firebaseFunctions'
import firebase from 'firebase';
import CommentUpvote from "./CommentUpvote";
import { timestampToCommentDateString } from "../../utils/TimeHelper";

type SecondaryProps = {
    data: any,
    boardId: string,
    postId: string,
    commentId: string,
    firebaseUserData: FirebaseUser,
    delete: any,
    index: number,
}

type SecondaryState = {
    secondary: any[],
    secondaryIds: any[],
    commentEntered: string,
    commentArray: string[],
    lastModified: number,
    replyOpen: boolean,
    reply: string,
}
const Container = styled.div`
    position: relative;
    top: 20px;
    width: ${(window.innerWidth * 0.4) - 20}px;
    background-color: transparent;
    color: white;
    font-size: 13px;
    font-weight: 800;
    line-height: 17px;
    padding-bottom: 30px;
`
const LeftBar = styled.div`
    position: absolute;
    top: -10px;
    left: 90px;
    height: 100%;
    padding-bottom: 10px;
    width: 0px;
    border: none;
    border-left: 1px solid #a8a8a8;
`
const ProfileImg = styled.img`
    width: 20px;
    height: 20px;
    padding: 10px;
    border-radius: 25px;
    border: 1px solid white;
    background-color: #0B121C;
    position: absolute;
    left: 105px;
    top: 7px;
`
const LastModified = styled.span`
    position: relative;
    left: 160px;
    top: 0px;
    font-weight: 700;
    font-size: 14px;
    line-height: 24.4px;
    color: #a8a8a8;
`
const Content = styled.div`
    position: relative;
    left: 160px;
`
const Like = styled.img`
    position: relative;
    left: 160px;
    top: 15px;
    cursor: pointer;
`
const LikeNum = styled.span`
    position: relative;
    left: 170px;
    top: 12px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
`
const ReplyButton = styled.button`
    &:hover {
        color: white;
    }

    position: relative;
    left: 198px;
    top: 10px;
    font-weight: 700;
    font-size: 14px;
    line-height: 24.4px;
    border: none;
    background-color: transparent;
    color: #a8a8a8;
    cursor: pointer;
`
const Form = styled.form`
    position: relative;
    top: 20px;
    left: 160px;
    margin-bottom: 10px;
`
const Input = styled.textarea`
    width: ${(window.innerWidth * 0.4) - 50}px;
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
    :hover {
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
    right: 0px;
    margin-top: 10px;
    width: 100px;
    height: 35px;
    background-color: #BDA06D;
    border: none;
    color: white;
    font-weight: bold;
    font-size: 16px;
`
const Delete = styled.span`
    position: relative;
    left: 180px;
    bottom: 0px;
    color: white;
    opacity: 0.6;
    cursor: pointer;
    font-weight: 600;
    font-size: 12px;

    :hover {
        opacity: 1;
    }
`

class Secondary extends React.Component<SecondaryProps, SecondaryState> {
    constructor(props: SecondaryProps) {
        super(props);
        this.state = {
            commentEntered: "",
            commentArray: [],
            secondary: [],
            secondaryIds: [],
            lastModified: 0,
            replyOpen: false,
            reply: ""
        }
    }

    componentDidMount() {
        this.fetchComment();
    }

    fetchComment() {
        if (this.props.data.replies) {
            const replyArray: FirestoreComment[] = [];
            const replyIdArray: any[] = [];
            for (let i = 0; i < this.props.data.replies.length; i = i + 1) {
                console.log(this.props.data.replies[i])
                this.props.data.replies[i].onSnapshot((querySnapshot: any) => {
                    if (querySnapshot.exists) {
                        let data = querySnapshot.data() as FirestoreComment;
                        replyArray[i] = data;
                        replyIdArray[i] = querySnapshot.id;
                        this.setState({
                            secondary: replyArray,
                            secondaryIds: replyIdArray,
                        })
                    }
                })
            }
        }
        this.setState({
            lastModified: this.props.data.lastModified + (2.88 * Math.pow(10, 7))
        })
    }

    render() {
        const handleReplyClick = (e: any) => {
            e.preventDefault();
            this.setState({
                replyOpen: !this.state.replyOpen,
            })
        }
        const handleCancelClick = (e: any) => {
            e.preventDefault()
            this.setState({
                commentEntered: "",
                replyOpen: false,
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
            const commentObject: FirestoreComment = {
                author: this.props.firebaseUserData.username,
                authorId: this.props.firebaseUserData.userId,
                content: this.state.commentEntered,
                isReply: true,
                lastModified: firebase.firestore.Timestamp.fromDate(new Date()),
                upvoteArray: [],
                replies: [],
                replyTo: dbService.doc(`/boards/${this.props.boardId}/posts/${this.props.postId}/comments/${this.props.commentId}`),
                postId: this.props.postId,
                boardId: this.props.boardId,
            }
            const addedCommentId = await dbService
                .collection('boards').doc(this.props.boardId)
                .collection('posts').doc(this.props.postId)
                .collection('comments')
                .add(commentObject)
            await dbService
                .collection('boards').doc(this.props.boardId)
                .collection('posts').doc(this.props.postId)
                .collection('comments').doc(this.props.commentId)
                .update({
                    replies: firebase.firestore.FieldValue.arrayUnion(dbService.doc(`/boards/${this.props.boardId}/posts/${this.props.postId}/comments/${addedCommentId.id}`)),
                })
            await dbService
                .collection('boards').doc(this.props.boardId)
                .collection('posts').doc(this.props.postId)
                .collection('comments').doc(addedCommentId.id)
                .update({
                    replyTo: dbService.doc(`/boards/${this.props.boardId}/posts/${this.props.postId}/comments/${this.props.commentId}`),
                })
            this.setState({
                commentEntered: "",
                replyOpen: false,
            })
            this.fetchComment()
        }
        
        const handleDeleteClick = () => {
            const confirmed = window.confirm("정말 삭제하시겠습니까?");
            if (confirmed) {
                this.props.data.replyTo.update({
                    replies: firebase.firestore.FieldValue.arrayRemove(dbService.collection('boards').doc(this.props.boardId).collection('posts').doc(this.props.postId).collection('comments').doc(this.props.commentId))   
                });
                dbService.collection('boards').doc(this.props.boardId).collection('posts').doc(this.props.postId).collection('comments').doc(this.props.commentId).delete();
                this.props.delete(this.props.index);
            }
        }

        const handleCommentDelete = (commentIndex: number) => {
            const temp = this.state.secondary;
            temp.splice(commentIndex, 1);
            this.setState({
                secondary: temp
            })
        }

        return (
            <Container>
                <LeftBar />
                <ProfileImg src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fprofile_default.png?alt=media&token=61ab872f-8f29-4d50-b22e-9342e0581fb5'} />
                <LastModified>{timestampToCommentDateString(this.props.data.lastModified)}</LastModified>
                {this.props.firebaseUserData.userId == this.props.data.authorId ? <Delete onClick={handleDeleteClick}>Delete</Delete>: <div />}
                <Content>{this.props.data.content}</Content>

                <CommentUpvote style={{ position: 'relative', left: '160px', top: '34px' }} boardId={this.props.boardId} postId={this.props.postId} commentId={this.props.commentId} upvoteArray={this.props.data.upvoteArray} />
                <ReplyButton onClick={handleReplyClick}>Reply</ReplyButton>
                {this.state.replyOpen ? <Form>
                    <Input placeholder={'Reply...'} onChange={handleInputChange} value={this.state.commentEntered} />
                    <Cancel onClick={handleCancelClick}>Cancel</Cancel>
                    <Submit onClick={handleSubmitClick}>Post</Submit>
                </Form> : <div />}
                {this.state.secondary.map((element, i) => <Secondary delete={handleCommentDelete} index={i} data={element} boardId={this.props.boardId} postId={this.props.postId} commentId={this.state.secondaryIds[i]} firebaseUserData={this.props.firebaseUserData} />)}
            </Container>
        )
    }
}

export default Secondary;