import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { User } from '../../types/User'
import { Headline } from '../../utils/ThemeText'

type BoardNavbarProps = {
    currentRoute: string,
    userData: User,
}

type BoardNavbarState = {
    componentArray: any[],
}

// Navigation bar for choosing individual boards
class BoardNavbar extends React.Component<BoardNavbarProps, BoardNavbarState> {
    private _isMounted = false;
    constructor(props: BoardNavbarProps) {
        super(props)
        this.state = {
            componentArray: [],
        }
    }

    fetchBoards = async () => {
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
        const url = process.env.REACT_APP_HOST + '/api/board/getBoards'
        const response = await fetch(url)
        if (response.status == 200) {
            const boards = await response.json()
            for (let i = 0; i < boards.length; i++) {
                if (boards[i].boardId !== this.props.currentRoute) {
                    componentArray.push(
                    <LinkContainer key={i}>
                        <Link to={{ pathname: `/boards/${boards[i].boardId}` }}
                            style={{ textDecoration: 'none' }}
                        >
                            <Headline color='white' >
                                {boards[i].title}
                            </Headline>
                        </Link>
                    </LinkContainer >)
                }
                else {
                    componentArray.push(
                        <CurrentContainer key={i}>
                            <Link to={{ pathname: `/boards/${boards[i].boardId}` }}
                                style={{ textDecoration: 'none' }}
                            >
                                <Headline color='white'>
                                    {boards[i].title}
                                </Headline>
                            </Link>
                        </CurrentContainer>
                    )
                }
            }
            this.setState({
                componentArray: componentArray
            })
        }
    }

    componentDidMount = () => {
        this._isMounted = true;
        if (this._isMounted) {
            this.fetchBoards()
        }
    }

    componentWillUnmount = () => {
        this._isMounted = false;
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