import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FirestorePost } from '../../types/FirestorePost'
import { Headline, DisplaySmall, DisplayMedium, SubHeadline } from '../../utils/ThemeText'
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

        const DateAndAuthor = styled.div`
            display: flex;
            flex-direction: column;
            margin-top: auto;
        `
        return (
            <Container>
                <Link to={this.props.to} style={{ textDecoration: 'none' }}>
                    <Thumbnail>
                        <DisplaySmall color='black' style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{this.props.firestorePost.title}</DisplaySmall>
                        <BoardTag
                            title={this.props.firestorePost.parentBoardTitle}
                            boxcolor={this.props.firestorePost.parentColor}
                            textcolor={this.props.firestorePost.parentTextColor}
                        />
                        <SubHeadline color='black' style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{this.props.firestorePost.content}</SubHeadline>
                        <DateAndAuthor>
                            {this.props.firestorePost.parentBoardId === 'grove' ?
                                <SubHeadline color='black'>익명/Anonymous</SubHeadline>
                                :
                                <SubHeadline color='black'>{this.props.firestorePost.author}</SubHeadline>
                            }
                            <Headline color='black' style={{marginTop:'0', marginBottom: '10px'}}>{this.props.firestorePost.lastModified.toDate().toDateString()}</Headline>
                        </DateAndAuthor>
                    </Thumbnail>
                </Link>
            </Container >
        )
    }
}

export default PostThumbnail;