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
import { FirebaseUser } from '../types/FirebaseUser';

type BoardProps = {
    firebaseUserData: FirebaseUser
    boardId: string,
    // username: string,
    // isVerified: boolean,
    // role: string
}

type BoardState = {
    title: string,
    englishTitle: string,
    description: string,
    permissions: string[],
    postArray: FirestorePost[],
    postComponentArray: any[]
}

class Board extends React.Component<BoardProps, BoardState> {
    state: BoardState = {
        title: "",
        englishTitle: "",
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
                const data = doc.data() as FirestoreBoard
                this.setState({
                    title: data.title,
                    englishTitle: data.englishTitle,
                    description: data.description,
                    permissions: data.permissions,
                })
            })
    }

    fetchPosts = () => {
        dbService
            .collection('boards').doc(this.props.boardId)
            .collection('posts')
            .onSnapshot((querySnapshot) => {
                const arr: FirestorePost[] = [];
                const componentArray: any[] = [];
                querySnapshot.docs.forEach((doc) => {
                    const data = doc.data() as FirestorePost;
                    console.log(doc.data())
                    const component = (
                        <>
                            <PostThumbnail
                                postTitle={data.title}
                                postContent={data.content}
                                boardId={this.props.boardId}
                                boardTitle={this.state.title}
                                username={this.props.firebaseUserData.username}
                                isVerified={this.props.firebaseUserData.isVerified}
                                role={this.props.firebaseUserData.role}
                                author={data.author}
                                boxcolor={data.parentColor}
                                textcolor={data.parentTextColor}
                                to={`/boards/${this.props.boardId}/${doc.id}`}
                            />
                            {/* Allow to edit all posts in the list */}
                        </>
                    )
                    arr.push(data);
                    if (data.permissions.includes(this.props.firebaseUserData.role) || data.permissions.includes('User')) {
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
        const displayVerification = localStorage.getItem("seeVerify")
        return (
            <Container>
                <Navbar firebaseUserData={this.props.firebaseUserData} />
                {this.props.firebaseUserData.isVerified != true
                    ? displayVerification === "yes"
                        ?
                        <VerificationRequest isModal={true} />
                        :
                        <></>
                    : <></>}
                <TextContainer>
                    <DisplayLarge color='white' style={{ alignSelf: 'flex-start', marginLeft: '10px', marginBottom: '10px' }}>
                        {this.props.boardId}
                    </DisplayLarge>
                    <Headline color='#FFFFFF' style={{ marginLeft: '10px', marginRight: '10px', opacity: '0.5', overflow: 'clip', width: '40vw' }}>
                        {this.state.description}
                    </Headline>
                    <GoldenButton to={`/boards/${this.props.boardId}/new`} style={{ filter: 'none', marginLeft: '10px', marginBottom: '10px' }}>
                        <Headline color='white' style={{ textAlign: 'center' }}>
                            + 게시글 올리기
                        </Headline>
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