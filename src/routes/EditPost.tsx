import React from "react";

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
class EditPost extends React.Component<PostProps, PostState> {
    render = () => {
        return (
            <div>
                Edit
            </div>
        )
    }
}

export default EditPost;