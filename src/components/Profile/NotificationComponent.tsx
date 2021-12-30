import React from 'react'
import styled from 'styled-components'
import { FirebaseUser } from '../../types/FirebaseUser'

type NotificationComponentProps = {
    data: any
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