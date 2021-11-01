import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FirestorePost } from '../../types/FirestorePost'
import { Headline, DisplaySmall, DisplayMedium } from '../../utils/ThemeText'
import BoardTag from './BoardTag'

type PostThumbnailProps = {
    to: string,
    firestorePost: FirestorePost

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
                        <DisplayMedium color='black'>{this.props.firestorePost.title}</DisplayMedium>
                        <BoardTag
                            title={this.props.firestorePost.parentBoardTitle}
                            boxcolor={this.props.firestorePost.parentColor}
                            textcolor={this.props.firestorePost.parentTextColor}
                        />
                        <DisplaySmall color='black'>{this.props.firestorePost.content}</DisplaySmall>
                        {this.props.firestorePost.parentBoardId === 'grove' ?
                            <Headline color='black'>익명/Anonymous</Headline>
                            :
                            <Headline color='black'>{this.props.firestorePost.author}</Headline>
                        }
                        <Headline color='black'>{this.props.firestorePost.lastModified.toDate().toDateString()}</Headline>
                    </Thumbnail>
                </Link>
            </Container>
        )
    }
}

export default PostThumbnail;