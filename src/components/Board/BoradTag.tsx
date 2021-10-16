import React from 'react'
import styled from 'styled-components'
import { Headline } from '../../utils/ThemeText'

type BoardTagProps = {
    boxcolor: string,
    textcolor: string,
    title: string
}

type BoardTagState = {

}

class BoardTag extends React.Component<BoardTagProps, BoardTagState> {
    constructor(props: BoardTagProps) {
        super(props)
        this.state = {

        }
    }

    render = () => {
        const TagWrapper = styled.div`
            background: ${this.props.boxcolor};
            border-radius: 6px;
        `
        return (
            <TagWrapper>
                <Headline color={this.props.textcolor}>
                    {this.props.title}
                </Headline>
            </TagWrapper>
        )
    }
}

export default BoardTag