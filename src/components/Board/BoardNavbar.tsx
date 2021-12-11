import { randomUUID } from 'crypto'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FirestoreBoard } from '../../types/FirestoreBoard'
import { dbService } from '../../utils/firebaseFunctions'
import { Headline } from '../../utils/ThemeText'

type BoardNavbarProps = {
    currentRoute: string
}

type BoardNavbarState = {
    componentArray: any[],
}

// Navigation bar for choosing individual boards
class BoardNavbar extends React.Component<BoardNavbarProps, BoardNavbarState> {
    constructor(props: BoardNavbarProps) {
        super(props)
        this.state = {
            componentArray: [],
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
            let key = 0;
            querySnapshot.docs.forEach((doc) => {
                key++
                const data = doc.data() as FirestoreBoard
                if (data.boardId !== this.props.currentRoute) {
                    componentArray.push(
                        <LinkContainer key={key}>
                            <Link to={{ pathname: `/boards/${data.boardId}` }}
                                style={{ textDecoration: 'none' }}
                            >
                                <Headline color='white' >
                                    {data.title}
                                </Headline>
                            </Link>
                        </LinkContainer >
                    )
                } else {
                    componentArray.push(
                        <CurrentContainer key={key}>
                            <Link to={{ pathname: `/boards/${data.boardId}` }}
                                style={{ textDecoration: 'none' }}
                            >
                                <Headline color='white'>
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