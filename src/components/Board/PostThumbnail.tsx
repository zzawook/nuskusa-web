import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Headline, DisplaySmall, DisplayMedium } from '../../utils/ThemeText'
import BoardTag from './BoardTag'

type PostThumbnailProps = {
    postTitle: string,
    postContent: string,
    // LastModified: Date,
    // NumberOfUpvotes: number,
    // NumberOfComments: number,
    boardId: string,
    boardTitle: string,
    username: string,
    isVerified: boolean,
    role: string,
    to: string,
    author: string,

    textcolor: string,
    boxcolor: string
}

class PostThumbnail extends React.Component<PostThumbnailProps, {}> {
    constructor(props: PostThumbnailProps) {
        super(props)
        this.state = {

        }
    }

    render = () => {
        const Container = styled.div`
            display: flex;
            flex-direction: column;
            width: 320px;
            height: 320px;
            align-items: center;
            justify-content: center;
            background: white;
            margin: 10px 20px;
        `
        const Thumbnail = styled.div`
            display: flex;
            flex-direction: column;
            width: 300px;
            height: 260px;
            background: white;
        `
        return (
            <Container>
                <Link to={this.props.to} style={{ textDecoration: 'none' }}>
                    <Thumbnail>
                        <DisplayMedium color='black'>{this.props.postTitle}</DisplayMedium>
                        <BoardTag title={this.props.boardTitle} boxcolor={this.props.boxcolor} textcolor={this.props.textcolor} />
                        <DisplaySmall color='black'>{this.props.postContent}</DisplaySmall>
                        { this.props.boardId === 'grove' ?
                            <Headline color='black'>익명/Anonymous</Headline>
                            :
                            <Headline color='black'>{this.props.author}</Headline>
                        }
                    </Thumbnail>
                </Link>
            </Container>
        )
    }
}

export default PostThumbnail;