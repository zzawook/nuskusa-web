import React from "react";
import { dbService } from "../utils/firebaseFunctions";

import Comment from '../components/Comment';
import Navbar from "../components/Navbar";

type FirestorePostState = {
    title: string,
    content: string,
    isAnnouncement: boolean,
    isAnonymous: boolean,
    isPinned: boolean,
    isHidden: boolean,
    lastModified: number,
    upvotes: number,
    numComments: number,
    permissions: string[],
    author: string,
}

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
    owner: string,
    upvotes: number,
    permissions: string[]
}

class Post extends React.Component<PostProps, PostState> {
    constructor(props: PostProps) {
        super(props);
        this.state = {
            title: '',
            content: '',
            isAnnouncement: false,
            isAnonymous: false,
            isPinned: false,
            isHidden: false,
            owner: '',
            upvotes: 0,
            permissions: ["Admin"]
        }
    }

    componentDidMount = () => {
        this.fetchPost();
    }

    fetchPost = () => {
        dbService
            .collection('boards').doc(this.props.boardId)
            .collection('posts')
            .doc(this.props.postId)
            .onSnapshot((querySnapshot) => {
                if (querySnapshot.exists) {
                    console.log(querySnapshot.data())
                    let data = querySnapshot.data() as FirestorePostState;
                    console.log(data);
                    if (data == undefined) {
                        return;
                    }
                    else {
                        if (data.permissions.includes(this.props.role) || data.permissions.includes("User")) {
                            this.setState({
                                title: data.title,
                                author: data.author,
                                isAnnouncement: data.isAnnouncement,
                                isAnonymous: data.isAnonymous,
                                isHidden: data.isHidden,
                                isPinned: data.isPinned,
                                lastModified: data.lastModified,
                                upvotes: data.upvotes,
                                permissions: data.permissions,
                                errorMsg: "ok"
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
                                    this.setState({
                                        commentArray: commentArray
                                    })
                                })
                        } else {
                            this.setState({
                                errorMsg: "Access denied-- you do not have permission."
                            })
                        }
                    }
                }
                console.log('post fetching successful')
            })
    }

    render = () => {
        return (
            <div>
                <Navbar />
                {this.props.postId}
                <Comment />
            </div>
        )
    }
}

export default Post;
