import { title } from 'process'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FirestorePost } from '../../types/FirestorePost'
import { Headline, DisplaySmall, DisplayMedium, SubHeadline } from '../../utils/ThemeText'
import BoardTag from './BoardTag';
import CSS from 'csstype';


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

    convertPost = (input: String) => {
        const anyInput = input as any;
        const htmlObject = document.createElement("div") as any;
        htmlObject.innerHTML = anyInput;
        return htmlObject.outerText.substring(0, 30);
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
        const titleStyle: CSS.Properties = {
            width: '85%',
            position: 'relative',
            left: '0px',
            top: '-30px',
        }
        const contentStyle: CSS.Properties = {
            position: 'relative',
            top: '-40px',
        }
        const tempStyle: CSS.Properties = {
            position: 'relative',
            top: '-50px'
        }

        return (
            <Container>
                {this.convertPost(this.props.firestorePost.content)}
                <Link to={this.props.to} style={{ textDecoration: 'none' }}>
                    <Thumbnail>
                        <DisplayMedium color='black' style={titleStyle}>{this.props.firestorePost.title}</DisplayMedium>
                        <BoardTag
                            title={this.props.firestorePost.parentBoardTitle}
                            boxcolor={this.props.firestorePost.parentColor}
                            textcolor={this.props.firestorePost.parentTextColor}
                            
                        />
                        <DisplaySmall color='black' style={contentStyle}>{this.convertPost(this.props.firestorePost.content)}</DisplaySmall>
                        {this.props.firestorePost.parentBoardId === 'grove' ?
                            <Headline color='black' style={tempStyle}>익명/Anonymous</Headline>
                            :
                            <Headline color='black'style={tempStyle}>{this.props.firestorePost.author}</Headline>
                        }
                        <Headline color='black' style={tempStyle}>{this.props.firestorePost.lastModified.toDate().toDateString()}</Headline>

                    </Thumbnail>
                </Link>
            </Container >
        )
    }
}

export default PostThumbnail;