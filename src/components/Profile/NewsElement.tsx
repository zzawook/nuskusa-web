import React from 'react'
import styled from 'styled-components'
import { FirebaseUser } from '../../types/FirebaseUser'

type NewsElementProps = {
    data: any
}

type NewsElementState = {

}

class NewsElement extends React.Component<NewsElementProps, NewsElementState> {
    constructor(props: NewsElementProps) {
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

export default NewsElement