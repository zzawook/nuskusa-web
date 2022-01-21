import React from 'react'
import styled from 'styled-components'
import { FirestorePost } from '../../types/FirestorePost'
import { Link, RouteComponentProps } from 'react-router-dom'
import { dbService } from '../../utils/firebaseFunctions'

type OtherPostProps = RouteComponentProps & {
    data: FirestorePost,
    postId: string,
    reloadFunction: any,
}

type OtherPostState = {
    mouseEntered: boolean,
    title: string
}

interface Props {
    boardType: string,
    changeBorder: boolean,
}

interface newProps {
    changeBorder: boolean,
}

const Container = styled.div<Props>`
    &:hover {
        background-color: ${props => {
        return getColor(props.boardType)
    }}
    }

    border: 1px solid #a8a8a8;
    position: relative;
    width: 80%;
    height: 120px;
    margin-bottom: 20px;
    left: 10%;
    cursor: pointer;
`
const Title = styled.span<newProps>`
    position: absolute;
    width: 90%;
    font-size: 13px;
    font-weight: 800;
    line-height: 19px;
    color: ${props => props.changeBorder ? "black" : "#a8a8a8"};
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    text-overflow: ellipsis;
    word-wrap: break-word;
`
const BoardType = styled.div<Props>`
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: 13px;
    font-weight: 800;
    line-height: 23px;
    border-radius: 10px;
    padding-left: 7px;
    padding-right: 7px;
    padding-top: 2px;
    padding-bottom: 2px;
    border: ${props => props.changeBorder ? "1px solid black" : 'none'};
    color: #808080;
    background-color: ${props => {
        return getColor(props.boardType)
    }};
`
const getColor = (boardType: string) => {
    if (boardType == "자유게시판") {
        return "#C4F2EF"
    }
    else if (boardType === "이벤트") {
        return "#D6F2C4"
    }
    else if (boardType === "대나무숲") {
        return "#99CEA5"
    }
    else if (boardType === "공지사항") {
        return "#FFD3D3"
    }
    else if (boardType === "취업/인턴") {
        return "#F2CEFF"
    }
}

class OtherPost extends React.Component<OtherPostProps, OtherPostState> {
    constructor(props: OtherPostProps) {
        super(props);
        this.state = {
            mouseEntered: false,
            title: '',
        }
    }

    reloader = () => {
        this.props.reloadFunction();
        this.forceUpdate()
    }

    goTo = () => {
        this.props.history.push(`/boards/${this.props.data.parentBoardId}/${this.props.postId}`)
    }

    componentDidMount() {
    }

    getBoard(boardName: string) {
        return ""
    }

    render() {
        const handleMouseEnter = (e: any) => {
            e.preventDefault();
            this.setState({
                mouseEntered: true,
            })
        }
        const handleMouseLeave = (e: any) => {
            e.preventDefault();
            this.setState({
                mouseEntered: false,
            })
        }

        return (
            <Link to={{ pathname: `/boards/${this.props.data.parentBoardId}/${this.props.postId}` }} style={{ textDecoration: 'none' }}>
                <Container boardType={this.props.data.parentBoardTitle} changeBorder={this.state.mouseEntered} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <Title changeBorder={this.state.mouseEntered}>{this.props.data.title.substring(0, 50)}{this.props.data.title.length > 50 ? "..." : ""}</Title>
                    <BoardType boardType={this.props.data.parentBoardTitle} changeBorder={this.state.mouseEntered}>{this.props.data.parentBoardTitle}</BoardType>
                </Container>
            </Link>
        )
    }
}

export default (OtherPost)