import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { SectionDescription, SectionTitle } from '../utils/ThemeText'

type BoardProps = {
    boardId: string,
    description: string,
    permissions: string[],
}

type BoardState = {

}

class BoardThumbnail extends React.Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props)
        this.state = {

        }
    }

    render = () => {
        const ThumbnailContainer = styled.div`
            display: flex;
            flex-direction: column;
            background: white;
            width: 40%;
            height: 15vh;
            overflow-x: hidden;
        `
        return (
            <ThumbnailContainer>
                <Link to={`/boards/${this.props.boardId}`} style={{ textDecoration: 'none' }}>
                    <SectionTitle color='black'>
                        {this.props.boardId}
                    </SectionTitle>
                    <SectionDescription color='black' style={{ opacity: '0.5', textOverflow:'ellipsis'}}>
                        {this.props.description}
                    </SectionDescription>
                </Link>
            </ThumbnailContainer>
        )
    }
}

export default BoardThumbnail