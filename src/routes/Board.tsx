import React from 'react';
import { dbService } from '../utils/firebaseFunctions';
import Post from './Post';

type PostObject = {
    title: string,
    description: string,
    permissions: string[],
}

type BoardProps = {
    boardId: string
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

    fetchPosts() {
        dbService
            .collection('boards').doc(this.props.boardId)
            .collection('posts')
            .onSnapshot((querySnapshot) => {
                const arr: PostObject[] = [];
                const componentArray: any[] = [];
                querySnapshot.docs.forEach((doc) => {
                    const data = doc.data() as PostObject;
                    const component = <Post postId={doc.id} />
                    arr.push(data);
                    componentArray.push(component);
                })
                this.setState({
                    postArray: arr,
                    postComponentArray: componentArray
                })
            })
    }

    render() {
        return (
            <div>
                {this.state.postComponentArray}
            </div>
        )
    }
}

export default Board;