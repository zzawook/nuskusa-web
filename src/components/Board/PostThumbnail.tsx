import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Post } from '../../types/Post'
import { Headline, DisplaySmall, DisplayMedium } from '../../utils/ThemeText'
import BoardTag from './BoardTag';
import CSS from 'csstype';
import { User } from '../../types/User'
import { Board } from '../../types/Board'
import { parse } from 'node-html-parser'
import { BsFillPinAngleFill } from 'react-icons/bs'
import { PostSummary } from '../../types/PostSummary'
import { DateToPrevString } from "../../utils/TimeHelper"

type PostThumbnailProps = {
    Post: PostSummary,
    Board: Board,
    to: string,
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

    componentDidMount() {
        console.log(this.props.Post.content)
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
        const substring = (content: string) => {
            if (content == undefined) {
                return undefined
            }
            else {
                return content.substring(0,30)
            }
        }

        return (
            <>
                {
                    this.props.Post.isHidden ?
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
                                        title={this.props.Board.title}
                                        boxcolor={this.props.Board.boardColor}
                                        textcolor={this.props.Board.boardTextColor}
                                    />
                                    <DisplaySmall color='black' style={contentStyle}>{this.props.Post.isEvent ? this.props.Post.content.substring(0,30) : this.convertPost(this.props.Post.content)}</DisplaySmall>
                                    <Headline color='black' style={tempStyle}>{DateToPrevString(this.props.Post.lastModified)}</Headline>
                                </Thumbnail>
                            </Link>
                        </Container>
                }
            </>
        )
    }
}

export default PostThumbnail;