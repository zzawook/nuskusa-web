import firebase from 'firebase'
import React from 'react'
import styled from 'styled-components'
import { FaHeart, FaRegHeart } from 'react-icons/fa';

type UpvoteProps = {
    boardId: string,
    postId: string,
    upvoteCount: number,
    upvoted: boolean,
}

type UpvoteState = {
    upvoted: boolean,
    upvoteCount: number,
    updating: boolean,
}

// Upvote button
class Upvote extends React.Component<UpvoteProps, UpvoteState> {
    constructor(props: UpvoteProps) {
        super(props)
        this.state = {
            upvoted: this.props.upvoted,
            upvoteCount: this.props.upvoteCount,
            updating: false,
        }
    }

    componentDidMount = () => {
    }

    static getDerivedStateFromProps = (newProps: UpvoteProps, prevState: UpvoteState) => {
        if (prevState.updating) {
            return {
                upvoteCount: prevState.upvoteCount,
                upvoted: prevState.upvoted,
                updating: false,
            }
        }
        else {
            return {
                upvoteCount: newProps.upvoteCount,
                upvoted: newProps.upvoted,
                updating: false,
            }
        }
    }

    handleUpvoteClick = async () => {
        const url = process.env.REACT_APP_HOST + "/api/post/pushPostUpvote/" + this.props.postId;
        const response = await fetch(url, {
            method: "POST",
        })

        if (response.status == 200) {
            const json = await response.json()
            const upvoteStatus = json.upvoted;
            const temp = this.state.upvoteCount;
            if (upvoteStatus) {
                this.setState({
                    upvoted: upvoteStatus,
                    upvoteCount: temp + 1,
                    updating: true,
                })
            }
            else {
                this.setState({
                    upvoted: upvoteStatus,
                    upvoteCount: temp - 1,
                    updating: true,
                })    
            }
        }
    }

    // an upvote image that is clickable and changes
    render = () => {
        const UpvoteContainer = styled.div`
            display: flex;
            flex-direction: row;
        `

        const UpvoteNum = styled.div`
            color: white;
            margin: 0px 5px;
        `

        return (
            <UpvoteContainer>
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

export default Upvote;