import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FirestoreNotification } from '../../types/FirestoreNotification'
import { authService, dbService } from '../../utils/firebaseFunctions'
import { getTypeMessage } from '../../utils/NotificationParser'
import { DisplaySmall, Headline } from '../../utils/ThemeText'
import firebase from 'firebase';

const ContentDiv = styled.div`
    margin-left: 10%;
    margin-right: 10%;
    font-size: 14px;
    line-height: 22px;
    font-weight: 700;
    word-wrap: break-word;
    box-sizing: border-box;
    text-align: left;
    color: ${props => props.color};
    height: 150px;
    padding-bottom: 10px;
    overflow: scroll;
`

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
        const typeMessage = getTypeMessage(this.props.data.notificationType, this.props.data.contentType);
        this.setState({
            typeMessage: typeMessage,
        });
    }

    onDeleteClick = () => {
        const userRef = dbService
            .collection('users').doc(authService.currentUser?.uid)
        userRef.update({
            notificationArray: firebase.firestore.FieldValue.arrayRemove({
                ...this.props.data,
            }),
        });
    }

    onLinkClick = () => {
        const userRef = dbService
            .collection('users').doc(authService.currentUser?.uid)
        const batch = dbService.batch();
        batch.update(userRef, {
            notificationArray: firebase.firestore.FieldValue.arrayRemove({
                ...this.props.data,
            }),
        });
        batch.update(userRef, {
            notificationArray: firebase.firestore.FieldValue.arrayUnion({
                ...this.props.data,
                isRead: true,
            })
        });
        batch.commit();
    }

    readComponent = () => {
        const Wrapper = styled.div`
            display: flex;
            flex-direction: column;
            width: 80%;
            height: 150px;
            background: white;
            margin: auto;
            margin-top: 10px;
        `
        const isRead = this.props.data.isRead;
        const notificationData = this.props.data.data;
        const title = notificationData.title
        const description = notificationData.description;
        const content = notificationData.content;

        return <Link to={this.props.data.link} style={{ textDecoration: 'none', }} onClick={this.onLinkClick}>
            <Wrapper style={{ opacity: isRead ? "0.5" : "1" }}>
                <Headline color='#BDA06D' style={{ marginTop: '25px', marginBottom: '0px' }}>{this.state.typeMessage}</Headline><br />
                {
                    this.props.data.notificationType !== "verification" ?
                        title ?
                            // This is a board/post related notification
                            description ?
                                <>
                                    {/* This is a board related notification */}
                                    <DisplaySmall color='black' style={{ marginTop: '0px', marginBottom: '0px' }}>{title}</DisplaySmall>
                                    <Headline color='black'>{description}</Headline>
                                </>
                                :
                                <>
                                    {/* This is a post related notification */}
                                    <DisplaySmall color='black' style={{ marginTop: '0px', marginBottom: '0px' }}>{title}</DisplaySmall>
                                    <ContentDiv color='black' dangerouslySetInnerHTML={{ __html: content }} />
                                </>
                            :
                            // This is a comment related notification
                            <>
                                <DisplaySmall color='black' style={{ marginTop: '0px', marginBottom: '0px' }}>{notificationData.author} replied to your comment!</DisplaySmall>
                            </>
                        :
                        <DisplaySmall color='black' style={{ marginTop: '0px', marginBottom: '0px' }}>{notificationData}</DisplaySmall>
                }
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