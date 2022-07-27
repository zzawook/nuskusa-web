import React from 'react'
import styled from 'styled-components'

type EditProps = {
    boardId: string,
    postId: string,
}



class EditPostButton extends React.Component<EditProps, {}> {
    constructor(props: EditProps) {
        super(props)
        this.state = {

        }
    }

    render = () => {
        const EditPostWrapper = styled.button`
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
        const handleEditClick = (e: any) => {
            e.preventDefault();
            window.location.href = `/#/boards/${this.props.boardId}/${this.props.postId}/edit`
        }
        return (
            <EditPostWrapper onClick={handleEditClick}>
                    Edit Post
            </EditPostWrapper>
        )
    }
}

export default EditPostButton