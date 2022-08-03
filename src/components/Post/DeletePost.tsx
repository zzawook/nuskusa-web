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
        const ok = window.confirm("게시물을 삭제하시면 복원할 수 없습니다. 게시물을 삭제하시겠습니까? ")
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
            height: 100%;
            line-height: 100%;
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