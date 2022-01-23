import React from "react";
import styled from 'styled-components';
import Secondary from './SecondaryComment';
import { FirestoreComment } from '../../types/FirestoreComment'
import { dbService } from '../../utils/firebaseFunctions'
import { FirebaseUser } from "../../types/FirebaseUser";
import firebase from 'firebase';
import CommentUpvote from "./CommentUpvote";
import { throws } from "assert";
import { timestampToCommentDateString } from "../../utils/TimeHelper";
import { Headline } from "../../utils/ThemeText";

type PrimaryProps = {
    data: any,
    boardId: string,
    postId: string,
    commentId: string,
    firebaseUserData: FirebaseUser,
    reset: any
}

type PrimaryState = {
    commentEntered: string,
    commentArray: [],
    lastModified: Date,
    secondaryOpen: boolean,
    secondary: any[],
    secondaryIds: any[],
    replyOpen: boolean,
    reply: string,
}

const PrimaryComment = styled.div`
    position: relative;
    margin-top: 20px;
    margin-bottom: 45px;
`
const CommentArrow = styled.img`

`
const ProfileImg = styled.img`
    width: 20px;
    height: 20px;
    padding: 10px;
    border-radius: 25px;
    border: 1px solid white;
    background-color: #0B121C;
    position: absolute;
    left: 30px;
`
const LastModified = styled.span`
    font-weight: 700;
    font-size: 14px;
    line-height: 24.4px;
    color: #a8a8a8;
`
const Content = styled.p`
    position: relative;
    left: 90px;
    top: -10px;
    font-size: 13px;
    font-weight: 800;
    line-height: 17px;
    width: 90%;
`

const ReplyButton = styled.button`
    :hover {
        color: white;
    }

    position: relative;
    left: 130px;
    top: -20px;
    font-weight: 700;
    font-size: 14px;
    line-height: 24.4px;
    border: none;
    background-color: transparent;
    color: #a8a8a8;
    cursor: pointer;
`
const SecondaryOpener = styled.span`
    :hover {
        text-decoration: underline;
        color: white;
    }

    position: relative;
    font-size: 14px;
    font-weight: 700;
    line-height: 24.4px;
    left: 90px;
    top: -10px;
    color: #b0b0b0;
    cursor: pointer;
`
const Form = styled.form`
    position: relative;
    top: -10px;
    left: 90px;
    width: 100%;
    margin-bottom: 10px;
`
const Input = styled.textarea`
    width: ${(window.innerWidth * 0.49) - 110}px;
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
const SmallArrow = styled.img`
    position: relative;
    left: 5px;
`
const Delete = styled.span`
    position: relative;
    color: white;
    opacity: 0.6;
    cursor: pointer;
    font-weight: 600;
    font-size: 12px;
    margin-left: 20px;
    top: 5px;
    :hover {
        opacity: 1;
    }
`

class Primary extends React.Component<PrimaryProps, PrimaryState> {
    constructor(props: PrimaryProps) {
        super(props);
        this.state = {
            commentEntered: "",
            commentArray: [],
            lastModified: new Date(),
            secondaryOpen: false,
            secondary: [],
            secondaryIds: [],
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

    componentDidUpdate() {
    }

    render() {
        const handleSecondaryClick = (e: any) => {
            e.preventDefault();
            this.setState({
                secondaryOpen: !this.state.secondaryOpen,
            })
        }
        const handleLikeClick = (e: any) => {
            e.preventDefault();
        }
        const handleCancelClick = (e: any) => {
            e.preventDefault()
            this.setState({
                reply: "",
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
                replyTo: dbService.doc(`/boards/${this.props.boardId}/posts/${this.props.postId}/comments/${this.props.commentId}`),
                lastModified: firebase.firestore.Timestamp.fromDate(new Date()),
                upvoteArray: [],
                replies: [],
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
                    replyTo: dbService.doc(`/boards/${this.props.boardId}/posts/${this.props.postId}/comments/${this.props.commentId}`)
                })
            this.setState({
                commentEntered: "",
                replyOpen: false,
            })
            this.fetchComment()
        }

        const handleReplyClick = (e: any) => {
            e.preventDefault();
            this.setState({
                replyOpen: !this.state.replyOpen,
            })
        }

        const handleDeleteClick = () => {
            if (window.confirm("정말 삭제하시겠습니까?")) {
                dbService.collection('boards').doc(this.props.boardId).collection('posts').doc(this.props.postId).collection('comments').doc(this.props.commentId).delete();
                this.props.reset();
            }
        }

        const handleCommentDelete = (commentIndex: number) => {
            const temp = this.state.secondary;
            temp.splice(commentIndex, 1);
            if (temp.length == 0) {
                this.setState({
                    secondaryOpen: false,
                })
            }
            this.setState({
                secondary: temp
            })
        }

        const ProfileBox = styled.div`
            position: relative;
            display: flex;
            flex-direction: row;
            top: -10px;
            align-items: flex-center;
            ;
        `

        const CommentInfoContainer = styled.div`
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            margin-left: 90px;
        `
        const Name = styled.span`
            font-size: 14px;
            line-height: 22px;
            font-weight: 700;
            word-wrap: break-word;
            box-sizing: border-box;
            text-align: left;
        `

        return (
            <PrimaryComment>
                <CommentArrow src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FcommentArrow.png?alt=media&token=e484a87e-cff6-4111-b36c-e82cedbe2584'} />
                <ProfileBox>
                    <ProfileImg src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fprofile_default.png?alt=media&token=61ab872f-8f29-4d50-b22e-9342e0581fb5'} />
                    <CommentInfoContainer>
                        <Name > {this.props.data.author} </Name>    
                        <LastModified>
                            {timestampToCommentDateString(this.props.data.lastModified)}
                        </LastModified>
                    </CommentInfoContainer>
                    {this.props.firebaseUserData.userId == this.props.data.authorId ? <Delete onClick={handleDeleteClick}>Delete</Delete> : <div />}
                </ProfileBox>

                <Content>{this.props.data.content}</Content>
                <CommentUpvote style={{ position: 'relative', left: '90px', top: '5px' }} boardId={this.props.boardId} postId={this.props.postId} commentId={this.props.commentId} upvoteArray={this.props.data.upvoteArray} />
                <ReplyButton onClick={handleReplyClick}>Reply</ReplyButton>
                {this.state.replyOpen ? <Form>
                    <Input placeholder={'Reply...'} onChange={handleInputChange} value={this.state.commentEntered} />
                    <Cancel onClick={handleCancelClick}>Cancel</Cancel>
                    <Submit onClick={handleSubmitClick}>Post</Submit>
                </Form> : <div />}
                {this.state.secondary.length > 0 ? <SecondaryOpener onClick={handleSecondaryClick}>{this.state.secondaryOpen ? 'Hide replies' : 'View replies'}{!this.state.secondaryOpen ? <SmallArrow src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FVector%204.png?alt=media&token=e83189ba-d386-4232-a473-1b1656d553b3'} /> : <SmallArrow src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FVector%203.png?alt=media&token=c39d0931-41d8-4ed1-bd6f-a5491da24e8a'} />}</SecondaryOpener> : <div />}
                {this.state.secondary.length > 0 && this.state.secondaryOpen ? this.state.secondary.map((element, i) => <Secondary delete={handleCommentDelete} index={i} data={element} boardId={this.props.boardId} postId={this.props.postId} commentId={this.state.secondaryIds[i]} firebaseUserData={this.props.firebaseUserData} />) : <div />}

            </PrimaryComment>
        )
    }
}

export default Primary;