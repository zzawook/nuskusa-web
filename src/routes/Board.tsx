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
import { FirestorePost } from '../types/FirestorePost';
import { FirestoreBoard } from '../types/FirestoreBoard'
import VerificationRequest from '../components/Verification/VerificationRequest';
import { User } from '../types/User';
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

type PostData = {
    data: FirestorePost,
    id: string,
}

type BoardState = {
    firestoreBoard: FirestoreBoard,
    postArray: PostData[],
    postComponentArray: any[],
    postOrder: SelectOption,
    searched: boolean,
    searchString: string,
    searchedPostArray: FirestorePost[],
}

let prevBoardURL = ""

class Board extends React.Component<BoardProps, BoardState> {
    state: BoardState = {
        firestoreBoard: {
            title: "",
            boardId: "",
            description: "",
            permissions: ["Admin"],
            boardColor: "",
            boardTextColor: "",
            editPermission: [],
        },
        postArray: [],
        postComponentArray: [],
        postOrder: { value: 'lastModified', label: 'Latest' },
        searched: false,
        searchString: "",
        searchedPostArray: [],
    }

    componentDidMount = () => {
        this.fetchBoard();
        this.fetchPosts();

    }

    componentDidUpdate = () => {
        if (prevBoardURL !== this.props.boardId) {
            prevBoardURL = this.props.boardId
            this.fetchBoard();
            this.fetchPosts();
        }
    }

    addPostLink = () => {
        return <button><Link to={`/boards/${this.props.boardId}/new`}></Link></button>
    }

    fetchBoard = () => {
        dbService.collection('boards').doc(this.props.boardId)
            .onSnapshot((doc) => {
                const data = doc.data() as FirestoreBoard
                this.setState({
                    firestoreBoard: {
                        title: data.title,
                        boardId: data.boardId,
                        description: data.description,
                        permissions: data.permissions,
                        boardColor: data.boardColor,
                        boardTextColor: data.boardTextColor,
                        editPermission: data.editPermission,
                    },
                    searchString: "",
                    searchedPostArray: [],
                    searched: false,
                })
            })
    }

    fetchPosts = () => {
        dbService
            .collection('boards').doc(this.props.boardId)
            .collection('posts').orderBy("isPinned", 'desc').orderBy(this.state.postOrder.value, 'desc')
            .onSnapshot((querySnapshot) => {
                const arr: PostData[] = [];
                const componentArray: any[] = [];
                let key = 0
                querySnapshot.docs.forEach((doc) => {
                    key++
                    const data = doc.data() as FirestorePost;
                    if (data.permissions.includes(this.props.userData.role) || data.permissions.includes('User')) {
                        if (data.isPinned) {
                            arr.unshift({
                                data: data,
                                id: doc.id,
                            })
                        }
                        else {
                            arr.push({
                                data: data,
                                id: doc.id,
                            })
                        }
                    }
                })
                const components = this.generateComponent(arr)
                this.setState({
                    postArray: arr,
                    postComponentArray: components
                })
            })
    }

    generateComponent = (postArray: PostData[]) => {
        const components = [];
        for (let i = 0; i < postArray.length; i++) {
            let data = postArray[i].data;
            let id = postArray[i].id
            let component = (
                <div key={i}>
                    <PostThumbnail
                        firestorePost={data}
                        User={this.props.userData}
                        to={`/boards/${this.props.boardId}/${id}`}
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
            if (postArray[i].data.content.includes(this.state.searchString)) {
                searchedPostArray.push(postArray[i])
            }
            else if (postArray[i].data.title.includes(this.state.searchString)) {
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
                {!this.props.userData.isVerified
                    ?
                    <VerificationRequest userData={this.props.userData} isModal={true} onClose={() => { }} />
                    :
                    <></>
                }
                <TextContainer>
                    <DisplayLarge color='white' style={{ alignSelf: 'flex-start', marginLeft: '10px', marginBottom: '10px' }}>
                        {this.state.firestoreBoard.title}
                    </DisplayLarge>
                    <Headline color='#FFFFFF' style={{ marginLeft: '10px', marginRight: '10px', opacity: '0.5', overflow: 'clip', width: '40vw' }}>
                        {this.state.firestoreBoard.description}
                    </Headline>
                    {this.state.firestoreBoard.editPermission.includes(this.props.userData.role) ?
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

export default Board;