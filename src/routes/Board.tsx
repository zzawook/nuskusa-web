import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import BoardNavbar from '../components/Board/BoardNavbar';
import ContactUs from '../components/ContactUs';
import { GoldenButton } from '../components/GoldenButton';
import Navbar from '../components/Navbar';
import PostThumbnail from '../components/Board/PostThumbnail';
import { dbService } from '../utils/FirebaseFunctions';
import { DisplayMedium, DisplayLarge } from '../utils/ThemeText';

type FirebasePostObject = {
    title: string,
    description: string,
    permissions: string[],
    author: string
}

type BoardProps = {
    boardId: string,
    username: string,
    isVerified: boolean,
    role: string
}

type FirestoreBoardState = {
    title: string,
    description: string,
    permissions: string[],
    englishTitle: string
}

type BoardState = {
    title: string,
    description: string,
    permissions: string[],
    postArray: FirebasePostObject[],
    postComponentArray: any[]
}

class Board extends React.Component<BoardProps, BoardState> {
    state: BoardState = {
        title: "",
        description: "",
        permissions: ["Admin"],
        postArray: [],
        postComponentArray: []
    }

    componentDidMount = () => {
        this.fetchBoard();
        this.fetchPosts();
    }

    addPostLink = () => {
        return <button><Link to={`/boards/${this.props.boardId}/new`}></Link></button>
    }

    fetchBoard = () => {
        dbService.collection('boards').doc(this.props.boardId)
            .onSnapshot((doc) => {
                const data = doc.data() as FirestoreBoardState
                this.setState({
                    title: data.title,
                    description: data.description,
                    permissions: data.permissions
                })
            })
    }

    fetchPosts = () => {
        dbService
            .collection('boards').doc(this.props.boardId)
            .collection('posts')
            .onSnapshot((querySnapshot) => {
                const arr: FirebasePostObject[] = [];
                const componentArray: any[] = [];
                querySnapshot.docs.forEach((doc) => {
                    const data = doc.data() as FirebasePostObject;
                    console.log(doc.data())
                    const component = (
                        <>
                            <PostThumbnail postTitle={data.title} postDescription={data.description}
                                boardId={this.props.boardId} username={this.props.username} isVerified={this.props.isVerified} role={this.props.role}
                                to={`/boards/${this.props.boardId}/${doc.id}`} author={data.author} />
                            {/* Allow to edit all posts in the list */}
                        </>
                    )
                    arr.push(data);
                    if (data.permissions.includes(this.props.role) || data.permissions.includes('User')) {
                        componentArray.push(component)
                    }
                })
                this.setState({
                    postArray: arr,
                    postComponentArray: componentArray
                })
                console.log('all posts fetching successful');
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
        `
        const PostContainer = styled.div`
            display: flex;
            flex-wrap: wrap;
            width: 70vw;
            height: 100vh;
            box-sizing: border-box;
            overflow-x: hidden;
            overflow-y: scroll;
            margin: auto;
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
        `

        return (
            <Container>
                <Navbar />
                <TextContainer>
                    <DisplayLarge color='white' style={{ alignSelf: 'flex-start', marginLeft: '10px', marginBottom: '10px' }}>
                        {this.props.boardId}
                    </DisplayLarge>
                    <DisplayMedium color='#FFFFFF' style={{ marginLeft: '10px', marginRight: '10px', opacity: '0.5', overflow: 'clip', width: '40vw' }}>
                        {this.state.description}
                    </DisplayMedium>
                    <GoldenButton to={`/boards/${this.props.boardId}/new`} style={{ filter: 'none', marginLeft: '10px', marginBottom: '10px' }}>
                        <DisplayMedium color='white' style={{ textAlign: 'center' }}>
                            + 게시글 올리기
                        </DisplayMedium>
                    </GoldenButton>
                </TextContainer>
                <BoardNavbar currentRoute={this.props.boardId} />
                {this.state.postComponentArray.length == 0 ?
                    <DisplayMedium color='white'>
                        There is no post here yet!
                    </DisplayMedium>
                    :
                    <PostContainer>
                        {this.state.postComponentArray}
                    </PostContainer>
                }
                <ContactUs />
            </Container>
        )
    }
}

export default Board;