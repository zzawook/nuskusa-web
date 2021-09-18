import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { SectionDescription, SectionTitle } from '../utils/ThemeText'

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
    to: string
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
            margin: 10px;
        `
        const Thumbnail = styled.div`
            display: flex;
            flex-direction: column;
            width: 300px;
            height: 260px;
            background: grey;
        `
        return (
            <Container>
                <Thumbnail>
                    <Link to={this.props.to}>
                        <SectionTitle>{this.props.postTitle}</SectionTitle>
                        <SectionDescription>{this.props.postDescription}</SectionDescription>
                    </Link>
                    {/* <SectionDescription> </SectionDescription> */}
                </Thumbnail>
            </Container>
        )
    }
}

export default PostThumbnail;