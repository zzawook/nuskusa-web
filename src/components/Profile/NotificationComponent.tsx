import React from 'react'
import styled from 'styled-components'
import { FirebaseUser } from '../../types/FirebaseUser'
import { FirestoreNotification } from '../../types/FirestoreNotification'

type NotificationComponentProps = {
    data: FirestoreNotification
}

type NotificationComponentState = {

}

class NotificationComponent extends React.Component<NotificationComponentProps, NotificationComponentState> {
    constructor(props: NotificationComponentProps) {
        super(props)
        this.state = {
        }
    }

    render = () => {
        const Wrapper = styled.div`

        `

        return (
            <Wrapper>
                
            </Wrapper>
        )
    }
}

export default NotificationComponent