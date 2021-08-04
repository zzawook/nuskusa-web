import React from 'react';
import { Link } from 'react-router-dom';
import { dbService } from '../utils/firebaseFunctions';

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

    componentDidMount = () => {
        this.fetchPosts();
    }

    fetchPosts = () => {
        dbService
            .collection('boards').doc(this.props.boardId)
            .collection('posts')
            .onSnapshot((querySnapshot) => {
                const arr: PostObject[] = [];
                const componentArray: any[] = [];
                querySnapshot.docs.forEach((doc) => {
                    const data = doc.data() as PostObject;
                    const component = (
                        <div>
                            <Link to={`/boards/${this.props.boardId}/${doc.id}`}>{data.title}</Link>
                            {/* Allow to edit all posts in the list */}
                        </div>
                    )
                    arr.push(data);
                    componentArray.push(component);
                })
                this.setState({
                    postArray: arr,
                    postComponentArray: componentArray
                })
                console.log('all posts fetching successful');
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