import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import BoardNavbar from '../components/Board/BoardNavbar';
import ContactUs from '../components/ContactUs';
import { GoldenButton } from '../components/GoldenButton';
import Navbar from '../components/Navbar';
import PostThumbnail from '../components/Board/PostThumbnail';
import { dbService } from '../utils/firebaseFunctions';
import { DisplayMedium, DisplayLarge, Headline } from '../utils/ThemeText';
import { Post } from '../types/Post';
import { Board } from '../types/Board'
import { User } from '../types/User';
import { PostSummary } from '../types/PostSummary';
import Select from 'react-select';
import { ActionMeta } from 'react-select';

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
`
const PostContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 70vw;
    height: 100vh;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: scroll;
    //margin: auto;
    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-track {
        max-width: 1px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
        width: 10px;
        height: 30px;
        background: white;
        border-radius: 5px;
    }
    margin-bottom: 10vh;
`
const BoardNavbarContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 70vw;
`
const SearchContainer = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const SearchBoard = styled.div`
    width: 40%;
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: row;
`
const SearchBar = styled.input`
    width: 70%;
    height: 40px;
    background-color: transparent;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid white;
    color: white;
`
const SearchButton = styled.div`
    margin-left: 10px;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    padding-right: 20px;
    border: 1px solid white;
    cursor: pointer;
    :hover {
        background-color: white;
        color: black;
    }
`
const customStyle = {
    valueContainer: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: '#0B121C',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: '#18202B',
        color: 'white',
    }),
    control: (provided: any, state: any) => ({
        ...provided,
        width: 'inherit',
        fontSize: '10px',
        backgroundColor: '#0B121C',
        color: 'white',
        borderRadius: '0px',
        border: '1px solid white'
    }),
    singleValue: (provided: any, state: any) => {
        return {
            ...provided,
            fontSize: '10px',
            backgroundColor: '#0B121C',
            color: 'white'
        };
    },
    menu: (provided: any, state: any) => {
        return {
            ...provided,
            backgroundColor: '#18202B',
            color: 'white',
            width: 'inherit'
        };
    },
    menuList: (provided: any, state: any) => {
        return {
            ...provided,
            backgroundCcolor: '#18202B',
            color: 'white'
        };
    },
    indicatorSeparator: (provided: any, state: any) => {
        return {
            ...provided,
            backgroundColor: '#0B121C',
            border: 'none'
        }
    }
}
type SelectOption = {
    value: string,
    label: string
}

type BoardProps = {
    userData: User
    boardId: string,
}

type BoardState = {
    Board: Board,
    postArray: PostSummary[],
    postComponentArray: any[],
    postOrder: SelectOption,
    searched: boolean,
    searchString: string,
    searchedPostArray: Post[],
}

let prevBoardURL = ""

class BoardPage extends React.Component<BoardProps, BoardState> {
    state: BoardState = {
        Board: {
            title: "",
            boardId: "",
            description: "",
            boardColor: "",
            boardTextColor: "",
        },
        postArray: [],
        postComponentArray: [],
        postOrder: { value: 'lastModified', label: 'Latest' },
        searched: false,
        searchString: "",
        searchedPostArray: [],
    }

    componentDidMount = async () => {
        await this.fetchBoard();
        await this.fetchPosts();

    }

    componentDidUpdate = async () => {
        if (prevBoardURL !== this.props.boardId) {
            prevBoardURL = this.props.boardId
            await this.fetchBoard();
            await this.fetchPosts();
        }
    }

    addPostLink = () => {
        return <button><Link to={`/boards/${this.props.boardId}/new`}></Link></button>
    }

    fetchBoard = async () => {
        const url = process.env.REACT_APP_HOST + "api/board/getBoard/" + this.props.boardId;
        const response = await fetch(url, {
            method: "GET",
        })

        if (response.status == 200) {
            const board = await response.json();
            console.log(board);
            const boardObject = {
                title: board.title,
                description: board.description,
                boardId: board.boardId,
                boardColor: board.boardColor,
                boardTextColor: board.boardTextColor,
            }
            this.setState({
                Board: boardObject
            })
        }
    }

    fetchPosts = async () => {
        const url = process.env.REACT_APP_HOST + "/api/board/getPosts/" + this.props.boardId;
        const response = await fetch(url, {
            method: "GET"
        })

        if (response.status == 200) {
            const posts = await response.json();
            const postArray = [];
            for (let i = 0; i < posts.length; i++) {
                const post = posts[i]
                const postObject: PostSummary = {
                    postId: post.id,
                    title: post.title,
                    content: post.content,
                    isAnnouncement: post.isAnnouncement,
                    isHidden: post.isHidden,
                    isAnonymous: post.isAnonymous,
                    isPinned: post.isPinned,
                    isEvent: post.isEvent,
                    lastModified: new Date(post.updatedAt),
                    author: post.author,
                }
                postObject.lastModified.setHours(postObject.lastModified.getHours() - 8);
                postArray.push(postObject);
            }
            const components = this.generateComponent(postArray);
            this.setState({
                postArray: postArray,
                postComponentArray: components,
            })
        }
    }

    generateComponent = (postArray: PostSummary[]) => {
        const components = [];
        for (let i = 0; i < postArray.length; i++) {
            let component = (
                <div key={i}>
                    <PostThumbnail
                        Post={postArray[i]}
                        Board={this.state.Board}
                        to={`/boards/${this.props.boardId}/${postArray[i].postId}`}
                    />
                    {/* Allow to edit all posts in the list */}
                </div>
            )
            components.push(component)
        }
        return components;
    }

    handleSelectChange = (option: SelectOption | null, actionMeta: ActionMeta<SelectOption>) => {
        this.setState({
            postOrder: option as SelectOption
        })
    }

    handleSearchInputChange = (event: any) => {
        event.preventDefault();
        this.setState({
            searchString: event.target.value,
        })
    }

    handleSearchClick = (event: any) => {
        if (this.state.searchString.trim() === "") {
            const components = this.generateComponent(this.state.postArray)
            this.setState({
                postComponentArray: components
            })
            return;
        }

        const searchedPostArray = [];
        const postArray = this.state.postArray;
        for (let i = 0; i < postArray.length; i++) {
            if (postArray[i].content.includes(this.state.searchString)) {
                searchedPostArray.push(postArray[i])
            }
            else if (postArray[i].title.includes(this.state.searchString)) {
                searchedPostArray.push(postArray[i])
            }
        }
        const searchedPostComponents = this.generateComponent(searchedPostArray);
        this.setState({
            postComponentArray: searchedPostComponents
        })
    }

    render = () => {
        return (
            <Container>
                <Navbar userData={this.props.userData} />
                <TextContainer>
                    <DisplayLarge color='white' style={{ alignSelf: 'flex-start', marginLeft: '10px', marginBottom: '10px' }}>
                        {this.state.Board.title}
                    </DisplayLarge>
                    <Headline color='#FFFFFF' style={{ marginLeft: '10px', marginRight: '10px', opacity: '0.5', overflow: 'clip', width: '40vw' }}>
                        {this.state.Board.description}
                    </Headline>
                    {true ?
                        <GoldenButton to={`/boards/${this.props.boardId}/new`} style={{ filter: 'none', marginLeft: '10px', marginBottom: '10px' }}>
                            <Headline color='white' style={{ textAlign: 'center' }}>
                                + 게시글 올리기
                            </Headline>
                        </GoldenButton>
                        :
                        <div />
                    }
                </TextContainer>
                <BoardNavbarContainer>
                    <BoardNavbar currentRoute={this.props.boardId} userData={this.props.userData} />
                    <div style={{ margin: 'auto', width: '150px' }}>
                        <Select
                            options={[
                                { value: 'latest', label: 'Latest' },
                                { value: 'upvotes', label: 'Most Popular' }
                            ]}
                            onChange={this.handleSelectChange}
                            styles={customStyle}
                            value={this.state.postOrder}
                        />
                    </div>
                </BoardNavbarContainer>

                {this.state.postComponentArray.length === 0 ?
                    <DisplayMedium color='white'>
                        등록된 게시글이 없습니다.
                    </DisplayMedium>
                    :
                    <PostContainer>
                        {this.state.postComponentArray}
                    </PostContainer>
                }
                <SearchContainer>
                    <SearchBoard>
                        <SearchBar value={this.state.searchString} placeholder={"게시글 검색어를 입력해주세요"} onChange={this.handleSearchInputChange} />
                        <SearchButton onClick={this.handleSearchClick}>검색</SearchButton>
                    </SearchBoard>
                </SearchContainer>
                <ContactUs />
            </Container>
        )
    }
}

export default BoardPage;