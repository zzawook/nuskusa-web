import React from 'react'
import styled from 'styled-components'
import { User } from '../../types/User'

const width = window.innerWidth

type DeleteProps = {
    boardId: string,
    postId: string,
    userData: User,
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
            const url = process.env.REACT_APP_HOST + "/api/post/deletePost/" + this.props.postId;
            const response = await fetch(url, {
                method: "DELETE"
            })
            if (response.status == 200) {
                window.alert("정상적으로 삭제되었습니다.")
                window.location.href = `#/boards/${this.props.boardId}`;
            }
            else {
                window.alert("삭제 요처을 처리하는 도중 문제가 발생했습니다. 오류가 계속되면 하단의 Contact Us 양식을 통해 한인회 IT에 문의해주세요.");
            }
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