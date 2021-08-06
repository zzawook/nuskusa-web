import React from "react";
import { dbService } from "../utils/firebaseFunctions";

type PostProps = {
    boardId: string,
    postId: string,
    username: string,
    isVerified: boolean,
    role: string
}

type PostState = {
    // title: string,
    // content: string,
    // isAnnouncement: boolean,
    // isAnonymous: boolean,
    // isPinned: boolean,
    // owner: string,
    // upvotes: number,
    // permissions: []
}

class Post extends React.Component<PostProps, PostState> {
    constructor(props: PostProps) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = () => {
        this.fetchPost();
    }

    fetchPost = () => {
        dbService
            .collection('boards').doc(this.props.boardId)
            .collection('posts').doc(this.props.postId)
            .onSnapshot((querySnapshot) => {
                if (querySnapshot.exists) {

                }

                console.log('post fetching successful')
            })
    }

    render = () => {
        return (
            <div>
                {this.props.postId}
            </div>
        )
    }
}

export default Post;
