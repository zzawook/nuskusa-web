import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FirestoreBoard } from '../../types/FirestoreBoard'
import { DisplaySmall, Headline } from '../../utils/ThemeText'

type BoardProps = FirestoreBoard

type BoardState = {
    color: string
}

class BoardThumbnail extends React.Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props)
        this.state = {
            color: "#FFFFFF",
        }
    }

    onThumbnailEnter = () => {
        this.setState({
            color: "#000000"
        })
    }

    onThumbnailLeave = () => {
        this.setState({
            color: "#FFFFFF"
        })
    }

    render = () => {
        const ThumbnailContainer = styled.div`
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: rgba(0, 0, 0, 0); 
            border: 2px solid ${this.props.boardColor};
            width: 40%;
            height: 15vh;
            overflow-x: hidden;
            margin-right: auto;
            margin-bottom: 10px;
            :hover {
                background: ${this.props.boardColor};
            }
        `
        return (
            <ThumbnailContainer onMouseEnter={this.onThumbnailEnter} onMouseLeave={this.onThumbnailLeave} >
                <Link to={`/boards/${this.props.boardId}`} style={{ opacity: '0.8', textDecoration: 'none' }}>
                    <DisplaySmall color={this.state.color} >
                        {this.props.title}
                    </DisplaySmall>
                    <Headline color={this.state.color} style={{ opacity: '0.5', textOverflow:'ellipsis', marginLeft:'10%', marginRight:'10%'}}>
                        {this.props.description}
                    </Headline>
                </Link>
            </ThumbnailContainer>
        )
    }
}

export default BoardThumbnail