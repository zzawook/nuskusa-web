import React from 'react'
import styled from 'styled-components'
import { FirestoreNotification } from '../../types/FirestoreNotification'
import { getTypeMessage } from '../../utils/NotificationParser'
import { Headline } from '../../utils/ThemeText'

type NotificationComponentProps = {
    data: FirestoreNotification
}

type NotificationComponentState = {
    typeMessage: string, // refers to the type of the notification
}

class NotificationComponent extends React.Component<NotificationComponentProps, NotificationComponentState> {
    constructor(props: NotificationComponentProps) {
        super(props)
        this.state = {
            typeMessage: "",
        }
    }

    componentDidMount = () => {
        const typeMessage = getTypeMessage(this.props.data.type);
        this.setState({
            typeMessage: typeMessage,
        });
    }

    render = () => {
        const Wrapper = styled.div`
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 80%;
            height: 262px;
            background: white;
            margin: auto;
        `
        const notificationData = this.props.data.data;
        const title = this.props.data.data.title
        return (
            <Wrapper>
                <Headline color='#BDA06D'>{this.state.typeMessage}</Headline><br />
                { title ?
                    // This is a board/post related notification
                    <Headline color='black'>{title}</Headline>
                    :
                    // This is a comment related notification
                    <Headline color='black'>{notificationData.author} replied to your comment!</Headline>
                }
            </Wrapper>
        )
    }
}

export default NotificationComponent