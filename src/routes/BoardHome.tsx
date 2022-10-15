import React from 'react';
import styled from 'styled-components';
import ContactUs from '../components/ContactUs';
import Navbar from '../components/Navbar';
import BoardThumbnail from '../components/BoardHome/BoardThumbnail';
import { DisplayLarge, Headline } from '../utils/ThemeText';
import { Board } from '../types/Board';
import { User } from '../types/User';

const LoadingBlocker = styled.div`
    opacity: 0.5;
    background-color: white;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 11;
`
const LoadingText = styled.span`
    background-color: white;
    color: black;
    font-size: 16px;
    font-weight: 600;
`

type BoardHomeProps = {
    userData: User
}

type BoardHomeState = {
    boardArray: Board[],
    boardComponentArray: any[],
    title: string,
    description: string,
    permissions: string[],
    loading: boolean
}

class BoardHome extends React.Component<BoardHomeProps, BoardHomeState> {
    constructor(props: BoardHomeProps) {
        super(props)
        this.state = {
            boardArray: [],
            boardComponentArray: [],
            title: '',
            description: '',
            permissions: [],
            loading: false
        }
        this.setLoading.bind(this);
        this.unsetLoading.bind(this);
    }
    

    componentDidMount = () => {
        if (localStorage.getItem("seeVerify") === null) {
            localStorage.setItem("seeVerify", "yes");
        }
        this.fetchBoards();
    }

    fetchBoards = async () => {
        const url = process.env.REACT_APP_HOST + "/api/board/getBoards"
        const response = await fetch(url, {
            method: "GET"
        })

        if (response.status == 200) {
            const boards = await response.json();
            const boardComponentArray = [];

            for (let i = 0; i < boards.length; i++) {
                boardComponentArray.push(
                    <BoardThumbnail
                        title={boards[i].title}
                        description={boards[i].description}
                        boardId={boards[i].boardId}
                        boardColor={boards[i].boardColor}
                        boardTextColor={boards[i].boardTextColor}
                    ></BoardThumbnail>
                )
            }

            this.setState({
                boardComponentArray: boardComponentArray
            })
        }
    }

    handleChange = (event: any) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (name === 'title') {
            this.setState({
                title: value
            })
        }
        else if (name === 'description') {
            this.setState({
                description: value
            })
        }
    }

    setLoading = () => {
        this.setState({
            loading: true
        })
    }

    unsetLoading = () => {
        this.setState({
            loading: false
        })
    }

    render = () => {
        const Container = styled.div`
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #0B121C;
            height: 100%;
            width: 100vw;
        `
        const TextContainer = styled.div`
            display: flex;
            flex-direction: column;
            width: 70vw;
            min-height: ${window.innerHeight}px;
        `

        const ThumbnailContainer = styled.div`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: left;
        `
        return (
            <Container>
                {this.state.loading ? <LoadingBlocker><LoadingText>거의 다 됐어요! 조금만 기다려주세요 :)</LoadingText></LoadingBlocker> : <></>}
                <Navbar userData={this.props.userData} />
                <TextContainer>
                    <DisplayLarge color='white' style={{ alignSelf: 'flex-start', marginLeft: '10px', marginBottom: '10px' }}>
                        게시판
                    </DisplayLarge>
                    <Headline color='white' style={{ opacity: '0.5', marginLeft: '10px', marginRight: '10px', wordBreak: 'keep-all', overflow: 'clip', width: '40vw', marginBottom: '30px' }}>
                        NUS 한인회 게시판에 오신 것을 환영합니다. 저희 게시판은 여러 게시글들을 통해 NUS 학생들, 그리고 NUS에 관심있는 사람들과 서로 소통하고 정보 공유를 위해 만들어진 페이지입니다.
                    </Headline>
                    <ThumbnailContainer>
                        {this.state.boardComponentArray}
                    </ThumbnailContainer>
                </TextContainer>
                <ContactUs setLoading={this.setLoading} unsetLoading={this.unsetLoading} />
            </Container>
        )
    }
}

export default BoardHome;