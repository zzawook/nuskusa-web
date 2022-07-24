import firebase from 'firebase'
import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import styled from 'styled-components'
import { authService, dbService } from '../../utils/firebaseFunctions'

type UpvoteProps = {
    boardId: string,
    postId: string,
    commentId: string,
    upvoteArray: firebase.firestore.DocumentReference[], // user reference of each upvoted person
    style?: React.CSSProperties
}

type UpvoteState = {
    hasUpvoted: boolean
}

// Upvote button
class CommentUpvote extends React.Component<UpvoteProps, UpvoteState> {
    constructor(props: UpvoteProps) {
        super(props)
        this.state = {
            hasUpvoted: true
        }
    }

    componentDidMount = () => {
        this.checkUpvoted()
    }

    // true if upvoted, false if did not upvote
    checkUpvoted = () => {
        let result = false;
        this.props.upvoteArray.forEach((userRef) => {
            if (!authService.currentUser) {
                return false;
            }
            else if (authService.currentUser?.uid === userRef.id) {
                result = true;
                return true;
            }
        })
        return result;
    }

    handleUpvoteClick = () => {
        const hasUpvoted = this.checkUpvoted();
        if (hasUpvoted === false) {
            // If the user did not upvote, upvote.
            dbService.collection('boards')
                .doc(this.props.boardId)
                .collection('posts')
                .doc(this.props.postId)
                .collection('comments')
                .doc(this.props.commentId)
                .update({
                    upvoteArray: firebase.firestore.FieldValue.arrayUnion(dbService.collection('users').doc(authService.currentUser?.uid))
                })
                .then(() => {

                })
        } else if (hasUpvoted === true) {
            // If the user did upvote already, remove upvote
            dbService.collection('boards')
                .doc(this.props.boardId)
                .collection('posts')
                .doc(this.props.postId)
                .collection('comments')
                .doc(this.props.commentId)
                .update({
                    upvoteArray: firebase.firestore.FieldValue.arrayRemove(dbService.collection('users').doc(authService.currentUser?.uid))
                })
        }
    }
    // an upvote image that is clickable and changes
    render = () => {
        const UpvoteContainer = styled.div`
            position: relative;
            display: flex;
            flex-direction: row;
        `

        const UpvoteNum = styled.div`
            color: white;
            margin: 0px 5px;
        `

        return (
            <UpvoteContainer style={this.props.style}>
                {this.checkUpvoted() ?
                    <FaHeart color='white' style={{ cursor: 'pointer' }} onClick={this.handleUpvoteClick} size='20px'></FaHeart>
                    :
                    <FaRegHeart style={{ cursor: 'pointer' }} onClick={this.handleUpvoteClick} size='20px'></FaRegHeart>
                }
                <UpvoteNum onClick={this.handleUpvoteClick}>{this.props.upvoteArray.length}</UpvoteNum>
            </UpvoteContainer>
        )
    }
}

export default CommentUpvote;