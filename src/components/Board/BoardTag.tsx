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
        console.log(this.props)
        const TagWrapper = styled.div`
            background: ${this.props.boxcolor};
            box-sizing: border-box;
            border: 1px solid ${this.props.boxcolor};
            border-radius: 6px;
            height: 26px;
            width: 66px;
            display: flex;
            margin: 0 10%;
        `
        return (
            <TagWrapper>
                <Headline color={this.props.textcolor} style={{ fontSize: '10px', textDecoration: 'none', margin: 'auto' }}>
                    {this.props.title}
                </Headline>
            </TagWrapper>
        )
    }
}

export default BoardTag