import React from 'react'
import styled from 'styled-components'
import { FirebaseUser } from '../../types/FirebaseUser'
import { dbService } from '../../utils/firebaseFunctions'

const width = window.innerWidth

type DeleteProps = {
    boardId: string,
    postId: string,
    firebaseUserData: FirebaseUser,
    userId: string,
}

class DeletePost extends React.Component<DeleteProps, {}> {
    constructor(props: DeleteProps) {
        super(props)
        this.state = {

        }
    }

    onDeleteClick = async () => {
        const ok = window.confirm("Do you really want to delete this post? This action is irreversible.")
        if (ok) {
            dbService.collection('boards').doc(this.props.boardId).collection('posts').doc(this.props.postId).delete().then(() => {
                window.alert('정상적으로 삭제되었습니다.');
                window.location.href = `#/boards/${this.props.boardId}`;
            })
        }
    }

    render = () => {
        const DeletePostWrapper = styled.button`
            background-color: transparent;
            border: none;
            color: white;
            cursor: pointer;
            opacity: 0.6;
            width: 100px;
            margin-left: ${(width * 0.7 * 0.35) - 200}px;
            :hover {
                opacity: 1;
            }
        `
        return (
            <DeletePostWrapper onClick={this.onDeleteClick}>
                Delete Post
            </DeletePostWrapper>
        )
    }
}

export default DeletePost