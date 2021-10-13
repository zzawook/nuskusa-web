import React from "react";
import Navbar from "../components/Navbar";
import { dbService } from "../utils/firebaseFunctions";

type PostProps = {
    boardId: string,
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

class AddPost extends React.Component<PostProps, PostState> {
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
            .collection('posts')
            .add(this.state);
    }

    render = () => {
        return (
            <div>
                <Navbar />
                Add
                
            </div>
        )
    }
}

export default AddPost;