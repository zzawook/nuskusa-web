import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Notification } from "../../types/Notification"
import { getTypeMessage } from '../../utils/NotificationParser'

const ContentDiv = styled.div`
    margin-right: 10%;
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 22px;
    font-weight: 500;
    word-wrap: break-word;
    box-sizing: border-box;
    text-align: left;
    color: ${props => props.color};
    padding-bottom: 10px;
    overflow: scroll;
    opacity: 60%;
`
const Headline = styled.p` 
    margin-left: 10%;
    margin-right: 10%;
    font-size: 18px;
    line-height: 22px;
    font-weight: 800;
    word-wrap: break-word;
    box-sizing: border-box;
    text-align: left;
    color: ${props => props.color};
`
const Title = styled.p`
    font-weight: 700;
    word-wrap: break-word;
    font-size: 17px;
    color: #0B121C;
    opacity: 60%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 10px;
`
const CommentArrow = styled.img`
    width: 12px;
    height: 12px;
    margin-top: 5px;
    margin-right: 5px;
`
const Content = styled.div`
    margin-top: 10px;
    margin-left: 10%;
    margin-right: 10%;
    display: flex;
    flex-direction: row;
`
type NotificationComponentProps = {
    data: Notification
}

type NotificationComponentState = {
    typeMessage: string, // refers to the type of the notification,
    isRead: boolean,
}

class NotificationComponent extends React.Component<NotificationComponentProps, NotificationComponentState> {
    constructor(props: NotificationComponentProps) {
        super(props)
        this.state = {
            typeMessage: "",
            isRead: false,
        }
    }

    componentDidMount = () => {
        const typeMessage = getTypeMessage(this.props.data.type, this.props.data.to);
        this.setState({
            typeMessage: typeMessage,
        });
    }

    onDeleteClick = async () => {
        const url = process.env.REACT_APP_HOST + "/api/profile/dismissAllNotification/" + this.props.data.id
        const response = await fetch(url, {
            method: "DELETE"
        })
        if (response.status == 200) {
            return;
        }
        else {
            window.alert("Error while dismissing notification");
        }
    }

    onLinkClick = async () => {
        const url = process.env.REACT_APP_HOST + "/api/profile/dismissNotification/" + this.props.data.id
        const response = await fetch(url, {
            method: "DELETE"
        })
        if (response.status == 200) {
            return;
        }
        else {
            window.alert("Error while dismissing notification");
        }
    }

    readComponent = () => {
        const Wrapper = styled.div`
            display: flex;
            flex-direction: column;
            width: 80%;
            background: white;
            margin: auto;
            margin-top: 10px;
        `
        const TagWrapper = styled.div`
            background-color: ${this.props.data.post.board.boardColor};
            box-sizing: border-box;
            border: 1px solid ${this.props.data.post.board.boardTextColor};
            border-radius: 6px;
            height: 26px;
            width: 66px;
            display: flex;
            margin: 0 10%;
        `
        const post = this.props.data.post

        return <Link to={"/boards/" + post.board.boardId + "/" + post.id} style={{ textDecoration: 'none', }} onClick={this.onLinkClick}>
            <Wrapper style={{ opacity: this.state.isRead ? "0.5" : "1" }}>
                <Headline color='#BDA06D' style={{ marginTop: '25px', marginBottom: '0px' }}>{this.state.typeMessage}</Headline><br />
                <Title>{this.props.data.type.includes("OnComment") ? this.props.data.from.content : this.props.data.post.title}</Title>
                <TagWrapper>
                    <Headline color={this.props.data.post.board.boardTextColor} style={{ fontSize: '10px', textDecoration: 'none', margin: 'auto' }}>
                        {this.props.data.post.board.title}
                    </Headline>
                </TagWrapper>
                <Content>
                    {this.props.data.type.includes("CommentOn") ? <CommentArrow src={'https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/source/arrow-coolicon.png'} /> : <></>}
                    <ContentDiv color={"#0B121C"}>{this.props.data.type.includes("CommentOn") ? this.props.data.to.content : ""}</ContentDiv>
                </Content>

            </Wrapper>
        </Link>
    }

    render = () => {


        return (
            <>
                {this.readComponent()}
            </>
        )
    }
}

export default NotificationComponent