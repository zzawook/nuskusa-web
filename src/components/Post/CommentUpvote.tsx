import firebase from 'firebase'
import React from 'react'
import styled from 'styled-components'
import { authService, dbService } from '../../utils/firebaseFunctions'
import { Headline } from '../../utils/ThemeText'

type UpvoteProps = {
    boardId: string,
    postId: string,
    commentId: string,
    upvoteArray: firebase.firestore.DocumentReference[] // user reference of each upvoted person
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
        this.props.upvoteArray.forEach((userRef) => {
            if (!authService.currentUser) {
                console.log("Not Logged In!")
                return;
            }
            if (authService.currentUser?.uid === userRef.id) {
                this.setState({
                    hasUpvoted: true
                })
                return;
            }
        })
        this.setState({
            hasUpvoted: false
        })
        return false;
    }

    onUpvoteClick = () => {
        if (!this.state.hasUpvoted) {
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
                .catch(error => {
                    console.error(error)
                })
        } else {
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
                .catch(error => {
                    console.error(error)
                })
        }
    }

    // an upvote image that is clickable and changes
    render = () => {
        const UpvoteContainer = styled.div`

        `

        const UpvoteButton = styled.button`
            
        `

        return (
            <UpvoteContainer>
                <UpvoteButton>
                    <Headline color='white' onClick={this.onUpvoteClick}>Upvote (temp)</Headline>
                </UpvoteButton>
            </UpvoteContainer>
        )
    }
}

export default CommentUpvote;