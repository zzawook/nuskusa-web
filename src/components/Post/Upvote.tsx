import firebase from 'firebase'
import React from 'react'
import styled from 'styled-components'
import { authService, dbService } from '../../utils/firebaseFunctions'

type UpvoteProps = {
    boardId: string,
    postId: string,
    upvoteArray: firebase.firestore.DocumentReference[] // user reference of each upvoted person
}

type UpvoteState = {
}

// Upvote button
class Upvote extends React.Component<UpvoteProps, UpvoteState> {
    constructor(props: UpvoteProps) {
        super(props)
        this.state = {
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
                console.log("Not Logged In!")
                return false;
            }
            else if (authService.currentUser?.uid === userRef.id) {
                console.log(userRef.id)
                console.log(authService.currentUser.uid)
                console.log('upvoted already')
                result = true;
                return true;
            }
        })
        return result;
    }

    handleUpvoteClick = () => {
        const hasUpvoted = this.checkUpvoted();
        console.log(this.props.upvoteArray)
        console.log(hasUpvoted)
        if (hasUpvoted === false) {
            // If the user did not upvote, upvote.
            console.log('case 1')
            dbService.collection('boards')
                .doc(this.props.boardId)
                .collection('posts')
                .doc(this.props.postId)
                .update({
                    upvoteArray: firebase.firestore.FieldValue.arrayUnion(dbService.collection('users').doc(authService.currentUser?.uid))
                })
                .then(() => {

                })
                .catch(error => {
                    console.error(error)
                })
        } else if (hasUpvoted === true) {
            // If the user did upvote already, remove upvote
            console.log('case 2')
            dbService.collection('boards')
                .doc(this.props.boardId)
                .collection('posts')
                .doc(this.props.postId)
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

        const UpvoteNum = styled.div`
            position: absolute;
            left: 0%;
            top: 0px;
            padding-left: 25px;
            cursor: pointer;
            color: white;
        `
        const UpvoteIcon = styled.img`
            width: 18px;
            height: 18px;
            border: none;
            position: absolute;
            left: 0px;
            top: 0px;
            cursor: pointer;
        `

        return (
            <UpvoteContainer>
                {this.checkUpvoted() ?
                    <>
                        <UpvoteIcon onClick={this.handleUpvoteClick} src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Flike.png?alt=media&token=fab6ba94-6f21-46db-bec3-6a754fb7eedb'} />
                        <UpvoteNum onClick={this.handleUpvoteClick}>{this.props.upvoteArray.length}</UpvoteNum>
                    </>
                    :
                    <>
                        <UpvoteIcon onClick={this.handleUpvoteClick} src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Flike.png?alt=media&token=fab6ba94-6f21-46db-bec3-6a754fb7eedb'} />
                        <UpvoteNum onClick={this.handleUpvoteClick}>{this.props.upvoteArray.length}</UpvoteNum>
                    </>
                }
            </UpvoteContainer>
        )
    }
}

export default Upvote;