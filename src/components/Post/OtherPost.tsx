import React from 'react'
import styled from 'styled-components'
import { FirestorePost } from '../../types/FirestorePost'
import { Link, RouteComponentProps } from 'react-router-dom'

type OtherPostProps = RouteComponentProps & {
    data: FirestorePost,
    postId: string,
    reloadFunction: any,
    boardData: any[],
}

type OtherPostState = {
    mouseEntered: boolean,
    title: string,
    boardColor: string,
}

interface Props {
    boardColor: string,
    changeBorder: boolean,
}

interface newProps {
    changeBorder: boolean,
}

const Container = styled.div<Props>`
    &:hover {
        background-color: ${props => {
        return props.boardColor
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
        return props.boardColor
    }};
`

class OtherPost extends React.Component<OtherPostProps, OtherPostState> {
    constructor(props: OtherPostProps) {
        super(props);
        this.state = {
            mouseEntered: false,
            title: '',
            boardColor: ""
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
        let bc = ""
        if (! this.props.boardData.find(elem => elem.boardId == this.props.data.parentBoardId) == undefined) {
            bc = this.props.boardData.find(elem => elem.boardId == this.props.data.parentBoardId).boardColor
        }
        this.setState({
            boardColor: bc,
        })
    }

    static getDerivedStateFromProps(newProps: any, prevState: any) {        
        let bc = ""
        if (newProps.boardData.find((elem: any) => elem.boardId == newProps.data.parentBoardId) != undefined) {
            bc = newProps.boardData.find((elem: any) => elem.boardId == newProps.data.parentBoardId).boardColor
        }
        return {
            boardColor: bc,
        }
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
                <Container 
                    boardColor={this.state.boardColor} changeBorder={this.state.mouseEntered} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <Title changeBorder={this.state.mouseEntered}>{this.props.data.title.substring(0, 50)}{this.props.data.title.length > 50 ? "..." : ""}</Title>
                    <BoardType boardColor={this.state.boardColor} changeBorder={this.state.mouseEntered}>{this.props.data.parentBoardTitle}</BoardType>
                </Container>
            </Link>
        )
    }
}

export default (OtherPost)