import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FirestorePost } from '../../types/FirestorePost'
import { Headline, DisplaySmall, DisplayMedium } from '../../utils/ThemeText'
import BoardTag from './BoardTag';
import CSS from 'csstype';
import { FirebaseUser } from '../../types/FirebaseUser'
import PostApprover from '../Grove/PostApprover'
import { parse } from 'node-html-parser'
import { BsFillPinAngleFill } from 'react-icons/bs'
import { FaBlackberry } from 'react-icons/fa'


type PostThumbnailProps = {
    to: string,
    firestorePost: FirestorePost,
    firebaseUser: FirebaseUser
}

type PostThumbnailState = {
    opacity: number,
}

class PostThumbnail extends React.Component<PostThumbnailProps, PostThumbnailState> {
    constructor(props: PostThumbnailProps) {
        super(props)
        this.state = {
            opacity: this.props.firestorePost.isHidden ? 0.7 : 1,
        }
    }

    convertPost = (input: String) => {
        const anyInput = input as any;
        const htmlObject = document.createElement("div") as any;
        htmlObject.innerHTML = anyInput;
        return htmlObject.outerText.substring(0, 30);
    }

    parseHtmlToThumbnailImage = () => {
        const root = parse(this.props.firestorePost.content);
        const imgHtml = root.getElementsByTagName("figure");
        if (imgHtml.length === 0) {
            return <></>
        }
        imgHtml[0].setAttribute("style", "overflow: hidden, width: 300, height: 300")
        console.log(imgHtml[0])
        return <div dangerouslySetInnerHTML={{ __html: imgHtml[0].innerHTML }}></div>;
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
            margin-top: 15px;
            margin-left: 15px;
            opacity: ${this.state.opacity};
        `
        const Thumbnail = styled.div`
            display: flex;
            flex-direction: column;
            width: 300px;
            height: 260px;
            background: white;
        `
        const TitleContainer = styled.div`
            display: flex;
            flex-direction: row;
        `
        const Pin = styled.div`
            position: relative;
            left: -10px;
            top: -10px

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
            <>
                {
                    this.props.firestorePost.isHidden ?
                        this.props.firebaseUser.role === "Admin" ?
                            <Container>
                                <Link to={this.props.to} style={{ textDecoration: 'none' }}>
                                    <Thumbnail style={{ height: "220px" }}>
                                        <TitleContainer>
                                            <DisplayMedium color='black' style={titleStyle}>{this.props.firestorePost.title}</DisplayMedium>
                                            {this.props.firestorePost.isPinned ? <Pin><BsFillPinAngleFill size="20" color="black" /></Pin> : <></>}
                                        </TitleContainer>
                                        <BoardTag
                                            title={this.props.firestorePost.parentBoardTitle}
                                            boxcolor={this.props.firestorePost.parentColor}
                                            textcolor={this.props.firestorePost.parentTextColor}
                                        />
                                        <DisplaySmall color='black' style={contentStyle}>{this.convertPost(this.props.firestorePost.content)}</DisplaySmall>
                                        {this.props.firestorePost.parentBoardId === 'grove' ?
                                            <Headline color='black' style={tempStyle}>익명/Anonymous</Headline>
                                            :
                                            <Headline color='black' style={tempStyle}>{this.props.firestorePost.author}</Headline>
                                        }
                                        <Headline color='black' style={tempStyle}>{this.props.firestorePost.lastModified.toDate().toDateString()}</Headline>
                                    </Thumbnail>
                                </Link>
                            </Container>
                            :
                            <></>
                        :
                        <Container>
                            <Link to={this.props.to} style={{ textDecoration: 'none' }}>
                                <Thumbnail>
                                    {/* {this.parseHtmlToThumbnailImage()} */}
                                    <TitleContainer>
                                        <DisplayMedium color='black' style={titleStyle}>{this.props.firestorePost.title}</DisplayMedium>
                                        {this.props.firestorePost.isPinned ? <Pin><BsFillPinAngleFill size="20" color="black" /></Pin> : <></>}
                                    </TitleContainer>
                                    <BoardTag
                                        title={this.props.firestorePost.parentBoardTitle}
                                        boxcolor={this.props.firestorePost.parentColor}
                                        textcolor={this.props.firestorePost.parentTextColor}
                                    />
                                    <DisplaySmall color='black' style={contentStyle}>{this.convertPost(this.props.firestorePost.content)}</DisplaySmall>
                                    {this.props.firestorePost.parentBoardId === 'grove' ?
                                        <Headline color='black' style={tempStyle}>익명/Anonymous</Headline>
                                        :
                                        <Headline color='black' style={tempStyle}>{this.props.firestorePost.author}</Headline>
                                    }
                                    <Headline color='black' style={tempStyle}>{this.props.firestorePost.lastModified.toDate().toDateString()}</Headline>
                                </Thumbnail>
                            </Link>
                        </Container>
                }
            </>
        )
    }
}

export default PostThumbnail;