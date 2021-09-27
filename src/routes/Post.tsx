import React from "react";
import { dbService } from "../utils/firebaseFunctions";
import Comment from '../components/Comment';

type PostProps = {
    boardId: string,
    postId: string,
    username: string,
    isVerified: boolean,
    role: string
}

type PostState = {
    title: string,
    content: string,
    isAnnouncement: boolean,
    isAnonymous: boolean,
    isPinned: boolean,
    isHidden: boolean,
    lastModified: number,
    upvotes: number,
    numComments: number,
    permissions: [],
    author: string,
}

class Post extends React.Component<PostProps, PostState> {
    constructor(props: PostProps) {
        super(props);
        this.state = {
            title: "Title",
            content: "Content",
            isAnnouncement: false,
            isAnonymous: true,
            isPinned: false,
            isHidden: false,
            lastModified: Date.now(),
            upvotes: 0,
            numComments: 0,
            permissions: [],
            author: "TempAuthor",
        }
    }

    componentDidMount = () => {
        this.fetchPost()
    }

    fetchPost = () => {
        dbService // Retrieve post information
            .collection('boards').doc(this.props.boardId)
            .collection('posts').doc(this.props.postId)
            .onSnapshot((querySnapshot) => {
                if (querySnapshot.exists) {
                    console.log(querySnapshot.data())
                    let data = querySnapshot.data();
                    console.log(data);
                    if (data == undefined) {
                        return;
                    }
                    else {
                        this.setState({
                            title: data.title,
                            author: data.author,
                            isAnnouncement: data.isAnnouncement,
                            isAnonymous: data.isAnonymous,
                            isHidden: data.isHidden,
                            isPinned: data.isPinned,
                            lastModified: data.lastModified,
                            upvotes: data.upvotes,
                            permissions: data.permissions
                        })
                    }
                }
                console.log('post fetching successful')
            })
        dbService // retrieve comments within the post
        .collection('boards').doc(this.props.boardId)
        .collection('posts').doc(this.props.postId)
        .collection('comments').onSnapshot((querySnapshot) => {
            const commentObjs = querySnapshot.docs;
            const commentArray = [];
            for (let i = 0; i < commentObjs.length; i++) {
                commentArray.push(commentObjs[i].data());
            }
            console.log(commentArray)
        })
    }

    render = () => {
        return (
            <div>
                {this.props.postId}
                <Comment />
            </div>
        )
    }
}

export default Post;
