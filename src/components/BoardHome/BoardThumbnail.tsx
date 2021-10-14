import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { DisplaySmall, DisplayMedium, Headline } from '../../utils/ThemeText'

type BoardProps = {
    boardId: string,
    description: string,
    permissions: string[],
    englishTitle: string
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
            margin-right: auto;
            margin-bottom: 10px;
        `
        return (
            <ThumbnailContainer>
                <Link to={`/boards/${this.props.englishTitle}`} style={{ textDecoration: 'none' }}>
                    <DisplaySmall color='black'>
                        {this.props.boardId}
                    </DisplaySmall>
                    <Headline color='black' style={{ opacity: '0.5', textOverflow:'ellipsis', marginLeft:'10%', marginRight:'10%'}}>
                        {this.props.description}
                    </Headline>
                </Link>
            </ThumbnailContainer>
        )
    }
}

export default BoardThumbnail