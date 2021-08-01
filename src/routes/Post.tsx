import React, { FC } from "react";

type PostProps = {
    postId: string
}

type PostState = {

}

class Post extends React.Component<PostProps, PostState> {
    render() {
        return (
            <div>
                {this.props.postId}
            </div>
        )
    }
}

export default Post;
