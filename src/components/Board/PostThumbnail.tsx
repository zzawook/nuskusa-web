import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Post } from '../../types/Post'
import { Headline, DisplaySmall, DisplayMedium } from '../../utils/ThemeText'
import BoardTag from './BoardTag';
import CSS from 'csstype';
import { User } from '../../types/User'
import { parse } from 'node-html-parser'
import { BsFillPinAngleFill } from 'react-icons/bs'

type PostThumbnailProps = {
    to: string,
    Post: Post,
    User: User
}

type PostThumbnailState = {
    opacity: number,
}

class PostThumbnail extends React.Component<PostThumbnailProps, PostThumbnailState> {
    constructor(props: PostThumbnailProps) {
        super(props)
        this.state = {
            opacity: this.props.Post.isHidden ? 0.7 : 1,
        }
    }

    convertPost = (input: String) => {
        const anyInput = input as any;
        const htmlObject = document.createElement("div") as any;
        htmlObject.innerHTML = anyInput;
        return htmlObject.outerText.substring(0, 30);
    }

    parseHtmlToThumbnailImage = () => {
        const root = parse(this.props.Post.content);
        const imgHtml = root.getElementsByTagName("figure");
        if (imgHtml.length === 0) {
            return <></>
        }
        imgHtml[0].setAttribute("style", "overflow: hidden, width: 300, height: 300")
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
            top: -10px;
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
                    this.props.Post.isHidden ?
                        this.props.User.role === "Admin" ?
                            <Container>
                                <Link to={this.props.to} style={{ textDecoration: 'none' }}>
                                    <Thumbnail style={{ height: "220px" }}>
                                        <TitleContainer>
                                            <DisplayMedium color='black' style={titleStyle}>{this.props.Post.title}</DisplayMedium>
                                            {this.props.Post.isPinned ? <Pin><BsFillPinAngleFill size="20" color="black" /></Pin> : <></>}
                                        </TitleContainer>
                                        <BoardTag
                                            title={this.props.Post.parentBoardTitle}
                                            boxcolor={this.props.Post.parentColor}
                                            textcolor={this.props.Post.parentTextColor}
                                        />
                                        <DisplaySmall color='black' style={contentStyle}>{this.props.Post.isEvent ? JSON.parse(this.props.Post.content).description.substring(0, 30) : this.convertPost(this.props.Post.content)}</DisplaySmall>
                                        {this.props.Post.parentBoardId === 'grove' ?
                                            <Headline color='black' style={tempStyle}>익명/Anonymous</Headline>
                                            :
                                            <Headline color='black' style={tempStyle}>{this.props.Post.author}</Headline>
                                        }
                                        <Headline color='black' style={tempStyle}>{this.props.Post.lastModified.toDate().toDateString()}</Headline>
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
                                        <DisplayMedium color='black' style={titleStyle}>{this.props.Post.title}</DisplayMedium>
                                        {this.props.Post.isPinned ? <Pin><BsFillPinAngleFill size="20" color="black" /></Pin> : <></>}
                                    </TitleContainer>
                                    <BoardTag
                                        title={this.props.Post.parentBoardTitle}
                                        boxcolor={this.props.Post.parentColor}
                                        textcolor={this.props.Post.parentTextColor}
                                    />
                                    <DisplaySmall color='black' style={contentStyle}>{this.props.Post.isEvent ? JSON.parse(this.props.Post.content).description.substring(0, 30) : this.convertPost(this.props.Post.content)}</DisplaySmall>
                                    {this.props.Post.parentBoardId === 'grove' ?
                                        <Headline color='black' style={tempStyle}>익명/Anonymous</Headline>
                                        :
                                        <Headline color='black' style={tempStyle}>{this.props.Post.author}</Headline>
                                    }
                                    <Headline color='black' style={tempStyle}>{this.props.Post.lastModified.toDate().toDateString()}</Headline>
                                </Thumbnail>
                            </Link>
                        </Container>
                }
            </>
        )
    }
}

export default PostThumbnail;