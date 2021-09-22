import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GoldenButton } from '../components/GoldenButton';
import Navbar from '../components/Navbar';
import PostThumbnail from '../components/PostThumbnail';
import { dbService } from '../utils/firebaseFunctions';
import { SectionDescription, Title } from '../utils/ThemeText';

type PostObject = {
    title: string,
    description: string,
    permissions: string[],
}

type BoardProps = {
    boardId: string,
    username: string,
    isVerified: boolean,
    role: string
}

type BoardState = {
    postArray: PostObject[],
    postComponentArray: any[]
}

class Board extends React.Component<BoardProps, BoardState> {
    state: BoardState = {
        postArray: [],
        postComponentArray: []
    }

    componentDidMount = () => {
        this.fetchPosts();
    }

    addPostLink = () => {
        return <button><Link to={`/boards/${this.props.boardId}/new`}></Link></button>
    }

    fetchPosts = () => {
        const PostThumbnailContainer = styled.div`
            width: 70vw;
            display: flex;
            flex-direction: row;
            justify-content: left;
        `
        dbService
            .collection('boards').doc(this.props.boardId)
            .collection('posts')
            .onSnapshot((querySnapshot) => {
                const arr: PostObject[] = [];
                const componentArray: any[] = [];
                let count: number = 0; // 
                let currentElement: number = 0;
                let tempArray: any[] = []
                querySnapshot.docs.forEach((doc) => {
                    const length = querySnapshot.docs.length;
                    const data = doc.data() as PostObject;
                    console.log(doc.data())
                    const component = (
                        <>
                            <PostThumbnail postTitle={data.title} postDescription={data.description}
                                boardId={this.props.boardId} username={this.props.username} isVerified={this.props.isVerified} role={this.props.role}
                                to={`/boards/${this.props.boardId}/${doc.id}`} />
                            {/* Allow to edit all posts in the list */}
                        </>
                    )
                    arr.push(data);
                    // Wraps three PostThumbnails into one container
                    if (count < 3) {
                        tempArray.push(component);
                        count++;
                    } else if (count == 3) {
                        componentArray.push(<PostThumbnailContainer>{tempArray}</PostThumbnailContainer>)
                        tempArray = [];
                        count = 0;
                    }
                    // When the docs array reaches the last element, add that element to componentArray,
                    // wrapped with PostThumbnailContainer
                    if (currentElement == length - 1) {
                        componentArray.push(<PostThumbnailContainer>{tempArray}</PostThumbnailContainer>)
                    }

                    currentElement++;
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
            height: 100vh;
            width: 100vw;
        `
        const TextContainer = styled.div`
            display: flex;
            flex-direction: column;
            width: 70vw;
        `

        return (
            <Container>
                <Navbar />
                <TextContainer>
                    <Title color='white' style={{ alignSelf: 'flex-start', marginLeft: '10px', marginBottom:'10px' }}>
                        게시판
                    </Title>
                    <SectionDescription color='#FFFFFF' style={{ marginLeft: '10px', marginRight: '10px', opacity: '0.5', overflow: 'clip', width: '40vw' }}>
                        NUS 한인회 게시판에 오신 것을 환영합니다. 저희 게시판은 여러 게시글들을 통해 NUS 학생들, 그리고 NUS에 관심있는 유저들과 서로 소통하고 정보 공유를 위해 만들어지는 페이지입니다.
                    </SectionDescription>
                    <GoldenButton to={`/boards/${this.props.boardId}/new`} style={{ filter: 'none', marginLeft: '10px', marginBottom: '10px'}}>
                        <SectionDescription color='white' style={{ textAlign:'center' }}>
                            + 게시글 올리기
                        </SectionDescription>
                    </GoldenButton>
                </TextContainer>
                {this.state.postComponentArray}
            </Container>
        )
    }
}

export default Board;