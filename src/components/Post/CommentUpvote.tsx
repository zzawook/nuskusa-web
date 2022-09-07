import firebase from 'firebase'
import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import styled from 'styled-components'
import { authService, dbService } from '../../utils/firebaseFunctions'

type UpvoteProps = {
    boardId: string,
    postId: string,
    commentId: string,
    upvoteCount: number,
    upvoted: boolean,
    style?: React.CSSProperties
}

type UpvoteState = {
    upvoted: boolean,
    upvoteCount: number,
}

// Upvote button
class CommentUpvote extends React.Component<UpvoteProps, UpvoteState> {
    constructor(props: UpvoteProps) {
        super(props)
        this.state = {
            upvoted: this.props.upvoted,
            upvoteCount: this.props.upvoteCount,
        }
    }

    componentDidMount = () => {
    }

    handleUpvoteClick = async () => {
        const url = process.env.REACT_APP_HOST + "/api/post/pushCommentUpvote/" + this.props.commentId;
        const response = await fetch(url, {
            method: "POST"
        });

        if (response.status == 200) {
            const json = await response.json();
            const upvoteStatus = json.upvoted;
            if (upvoteStatus) {
                this.setState({
                    upvoted: upvoteStatus,
                    upvoteCount: this.state.upvoteCount + 1,
                })
            }
            else {
                this.setState({
                    upvoted: upvoteStatus,
                    upvoteCount: this.state.upvoteCount - 1,
                })
            }
        }
        else {
            window.alert("좋아요 처리에 실패했습니다.")
        }
    }
    // an upvote image that is clickable and changes
    render = () => {
        const UpvoteContainer = styled.div`
            position: relative;
            display: flex;
            flex-direction: row;
        `

        const UpvoteNum = styled.div`
            color: white;
            margin: 0px 5px;
        `

        return (
            <UpvoteContainer style={this.props.style}>
                {this.state.upvoted ?
                    <FaHeart color='white' style={{ cursor: 'pointer' }} onClick={this.handleUpvoteClick} size='20px'></FaHeart>
                    :
                    <FaRegHeart style={{ cursor: 'pointer' }} onClick={this.handleUpvoteClick} size='20px'></FaRegHeart>
                }
                <UpvoteNum onClick={this.handleUpvoteClick}>{this.state.upvoteCount}</UpvoteNum>
            </UpvoteContainer>
        )
    }
}

export default CommentUpvote;