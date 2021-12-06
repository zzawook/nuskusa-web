import React from 'react'
import styled from 'styled-components'
import { FirebaseUser } from '../../types/FirebaseUser'
import { dbService } from '../../utils/firebaseFunctions'

type DeleteProps = {
    boardId: string,
    postId: string,
    firebaseUserData: FirebaseUser
}

class DeletePost extends React.Component<DeleteProps, {}> {
    constructor(props: DeleteProps) {
        super(props)
        this.state = {

        }
    }

    onDeleteClick = async () => {
        const ok = window.prompt("Do you really want to delete this post? This action is irreversible.")
        if (ok) {
            const postRef = dbService.collection('boards').doc(this.props.boardId).collection('posts').doc(this.props.postId)
            const userPostRef = dbService.collection('users').doc(this.props.firebaseUserData.userId).collection('posts').doc()
            const batch = dbService.batch()
            try {
                batch.delete(postRef)
                batch.delete(userPostRef)
            } catch (e) {
                console.error(e)
            }
        }
    }

    render = () => {
        const DeletePostWrapper = styled.button`

        `
        return (
            <DeletePostWrapper onClick={this.onDeleteClick}>
                Delete Post
            </DeletePostWrapper>
        )
    }
}

export default DeletePost