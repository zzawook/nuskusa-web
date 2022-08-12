import React from 'react';
import firebase from 'firebase';
import { User } from '../../types/User';
import { Post } from '../../types/Post';
import { authService, dbService } from '../../utils/firebaseFunctions';
import styled from 'styled-components';
import { AiFillCheckSquare, AiFillCloseSquare } from 'react-icons/ai';
import { FirestoreNotification } from '../../types/FirestoreNotification';

type PostApproverProps = {
    Post: Post,
    User: User,
}

type PostApproverState = {
    reason: string,
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`

const RejectInput = styled.input`

`

class PostApprover extends React.Component<PostApproverProps, PostApproverState> {
    constructor(props: PostApproverProps) {
        super(props);
        this.state = {
            reason: "",
        }
    }

    // Approves the post to be posted. Makes isHidden false in Post object.
    approvePost = async () => {
        const postRef = dbService
            .collection("boards").doc(this.props.Post.parentBoardId)
            .collection("posts").doc(this.props.Post.postId);

        const userRef = dbService
            .collection("users").doc(authService.currentUser?.uid);
        await dbService.runTransaction(async transaction => {
            transaction.update(postRef, {
                isHidden: false,
            });
            const notification: FirestoreNotification = {
                isRead: false,
                notificationType: "update",
                contentType: "approve",
                source: postRef,
                message: "Your post has been approved!",
                link: `/boards/${this.props.Post.parentBoardId}/${this.props.Post.postId}`,
                data: this.props.Post,
                timestamp: firebase.firestore.Timestamp.now(),
            };
            transaction.update(userRef, {
                notificationArray: firebase.firestore.FieldValue.arrayUnion(notification),
            })
        })
    }

    handleReasonChange = (event: any) => {
        if (event.target.name === 'reason') {
            this.setState({
                reason: event.target.value
            });
        }
    }

    rejectPost = async () => {
        const postRef = dbService
            .collection("boards").doc(this.props.Post.parentBoardId)
            .collection("posts").doc(this.props.Post.postId);

        const userRef = dbService
            .collection("users").doc(authService.currentUser?.uid);
        await dbService.runTransaction(async transaction => {
            transaction.delete(postRef);
            const notification: FirestoreNotification = {
                isRead: false,
                notificationType: "update",
                contentType: "reject",
                source: null,
                message: "Your post has been rejected. Reason: " + this.state.reason,
                link: `/boards/${this.props.Post.parentBoardId}/${this.props.Post.postId}`,
                data: this.props.Post,
                timestamp: firebase.firestore.Timestamp.now(),
            };
            transaction.update(userRef, {
                notificationArray: firebase.firestore.FieldValue.arrayUnion(notification),
            })
        })

    }

    render = () => {
        return (
            <Container>
                <AiFillCheckSquare onClick={this.approvePost} style={{ margin: 'auto', cursor: "pointer" }} size="48px" color="#99CEA5" />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <RejectInput onChange={this.handleReasonChange}></RejectInput>
                    <AiFillCloseSquare onClick={this.rejectPost} style={{ margin: 'auto', cursor: "pointer" }} size="48px" color="#ff7474" />
                </div>
            </Container>
        )
    }
}

export default PostApprover;