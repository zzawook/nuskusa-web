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
class EditPost extends React.Component<PostProps, PostState> {
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

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        } as unknown as PostState)
    }

    handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        dbService
            .collection('boards').doc(this.props.boardId)
            .collection('posts').doc(this.props.postId).update(this.state);
    }

    render = () => {
        return (
            <div>
                Edit
            </div>
        )
    }
}

export default EditPost;