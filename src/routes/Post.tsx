import React from "react";
import { dbService } from "../utils/firebaseFunctions";
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes

type PostProps = {
    boardId: string,
    postId: string
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

    }

    fetchPost = () => {
        dbService
            .collection('boards').doc(this.props.boardId)
            .collection('posts').doc(this.props.postId)
            .onSnapshot((querySnapshot) => {
                if (querySnapshot.exists) {
<<<<<<< Updated upstream

=======
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
>>>>>>> Stashed changes
                }
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
