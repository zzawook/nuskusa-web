import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Headline, DisplaySmall, DisplayMedium } from '../../utils/ThemeText'

type PostThumbnailProps = {
    postTitle: string,
    postDescription: string,
    // LastModified: Date,
    // NumberOfUpvotes: number,
    // NumberOfComments: number,
    boardId: string,
    username: string,
    isVerified: boolean,
    role: string,
    to: string,
    author: string
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
                        <DisplaySmall color='black'>{this.props.postDescription}</DisplaySmall>
                        { this.props.boardId === 'grove' ?
                            <Headline>익명/Anonymous</Headline>
                            :
                            <Headline>{this.props.author}</Headline>
                        }
                    </Thumbnail>
                </Link>
                {/* <DisplaySmall> </DisplaySmall> */}
            </Container>
        )
    }
}

export default PostThumbnail;