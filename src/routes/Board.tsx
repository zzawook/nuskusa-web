import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import PostThumbnail from '../components/PostThumbnail';
import { dbService } from '../utils/firebaseFunctions';

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
            justify-content: center;
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

    render() {
        const Container = styled.div`
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #0B121C;
            height: 100vh;
        `
        return (
            <Container>
                <Navbar />
                {this.state.postComponentArray}
            </Container>
        )
    }
}

export default Board;