import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { dbService } from '../../utils/firebaseFunctions'
import { DisplaySmall, Headline } from '../../utils/ThemeText'

type BoardProps = {
    title: string,
    description: string,
    permission: string[]
}

type BoardNavbarProps = {
    currentRoute: string
}

type BoardNavbarState = {
    componentArray: any[]
}

// Navigation bar for choosing individual boards
class BoardNavbar extends React.Component<BoardNavbarProps, BoardNavbarState> {
    constructor(props: BoardNavbarProps) {
        super(props)
        this.state = {
            componentArray: []
        }
    }

    fetchBoards = () => {
        const LinkContainer = styled.div`
            display: inline-block;
            opacity: 0.5;
            margin: 5px 10px;
            white-space: nowrap;
            :hover {
                opacity: 1;
            }
        `
        const CurrentContainer = styled.div`
            display: inline-block;
            opacity: 1;
            margin: 5px 10px;
            white-space: nowrap;
        `

        const componentArray: any = []
        dbService.collection('boards').get().then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
                const data = doc.data() as BoardProps
                if (data.title !== this.props.currentRoute) {
                    componentArray.push(
                        <LinkContainer>
                            <Link to={`/boards/${data.title}`} style={{ textDecoration: 'none' }}>
                                <Headline color='white' >
                                    {data.title}
                                </Headline>
                            </Link>
                        </LinkContainer>
                    )
                } else {
                    componentArray.push(
                        <CurrentContainer>
                            <Link to={`/boards/${data.title}`} style={{ textDecoration: 'none' }}>
                                <Headline color='white' >
                                    {data.title}
                                </Headline>
                            </Link>
                        </CurrentContainer>
                    )
                }
            })
        })
            .then(() => {
                this.setState({
                    componentArray: componentArray
                })
            })
    }

    componentDidMount = () => {
        this.fetchBoards()
    }

    render = () => {
        const Wrapper = styled.div`
            display: flex;
            flex-direction: row;
            width: 70vw;
        `
        return (
            <Wrapper>
                {this.state.componentArray}
            </Wrapper>
        )
    }
}

export default BoardNavbar