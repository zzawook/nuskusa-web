import React from "react";
import styled from 'styled-components';
import { User } from "../../types/User";
import CommentUpvote from "./CommentUpvote";
import { DateToPrevString } from "../../utils/TimeHelper";
import Avatar from "../Profile/Avatar"

type SecondaryProps = {
    data: any,
    boardId: string,
    postId: string,
    userData: User,
    delete: any,
    index: number,
    reset: Function,
}

type SecondaryState = {
    secondary: any[],
    secondaryIds: any[],
    commentEntered: string,
    commentArray: string[],
    lastModified: number,
    replyOpen: boolean,
    reply: string,
    authorData: User,
}
const Container = styled.div`
    position: relative;
    width: ${(window.innerWidth * 0.4) - 20}px;
    background-color: transparent;
    color: white;
    font-size: 13px;
    font-weight: 800;
    line-height: 17px;
`
const LeftBar = styled.div`
    position: absolute;
    left: 90px;
    height: 100%;
    padding-bottom: 10px;
    width: 0px;
    border: none;
    border-left: 1px solid #a8a8a8;
`
const ProfileImg = styled(Avatar)`
    width: 20px;
    height: 20px;
    border-radius: 25px;
    border: 1px solid white;
    background-color: #0B121C;
    position: absolute;
    left: 0%;
    bottom: 30px;
`
const LastModified = styled.span`
    font-weight: 700;
    font-size: 14px;
    line-height: 24.4px;
    color: #a8a8a8;
`
const Content = styled.div`
    position: relative;
    left: 160px;
    top: 10px;
    font-size: 13px;
    font-weight: 800;
    line-height: 17px;
    width: 90%;
`
const ReplyButton = styled.button`
    &:hover {
        color: white;
    }

    position: relative;
    left: 198px;
    top: 10px;
    font-weight: 700;
    font-size: 14px;
    line-height: 24.4px;
    border: none;
    background-color: transparent;
    color: #a8a8a8;
    cursor: pointer;
`
const Form = styled.form`
    position: relative;
    top: 20px;
    left: 160px;
    margin-bottom: 10px;
`
const Input = styled.textarea`
    width: ${(window.innerWidth * 0.4) - 50}px;
    height: 70px;
    padding: 10px;
    background-color: #0B121C;
    border: 1px solid #9c9c9c;
    color: white;
    font-weight: bold;
    font-size: 14px;
    font-family: var(--font-family-roboto);
    resize: none;
`
const Cancel = styled.button`
    :hover {
        color: white;
    }

    position: relative;
    right: 0px;
    margin-top: 10px;
    width: 100px;
    height: 35px;
    background-color: transparent;
    border: none;
    color: #858585;
    font-weight: bold;
    font-size: 16px;
    right: 0px;
`
const Submit = styled.button`
    :hover {
        border: 1px solid white;
    }

    position: relative;
    right: 0px;
    margin-top: 10px;
    width: 100px;
    height: 35px;
    background-color: #BDA06D;
    border: none;
    color: white;
    font-weight: bold;
    font-size: 16px;
`
const Delete = styled.span`
    position: relative;
    bottom: 0px;
    color: white;
    opacity: 0.6;
    cursor: pointer;
    font-weight: 600;
    font-size: 12px;
    margin-left: auto;
    top: 4px;

    :hover {
        opacity: 1;
    }
`
const Spacer = styled.div`
    height: 30px;
`

class Secondary extends React.Component<SecondaryProps, SecondaryState> {
    constructor(props: SecondaryProps) {
        super(props);
        this.state = {
            commentEntered: "",
            commentArray: [],
            secondary: [],
            secondaryIds: [],
            lastModified: 0,
            replyOpen: false,
            reply: "",
            authorData: {
                name: "",
                email: "",
                role: "User", // User, Undergraduate, Graduate, Admin
                profileImageUrl: "",
                yearOfBirth: "",
            },
        }
    }

    componentDidMount() {
        this.fetchComment();
    }

    async fetchComment() {
        const url = process.env.REACT_APP_HOST + "/api/post/getComments/" + this.props.data.id;

        const response = await fetch(url, {
            method: "GET",
        })

        if (response.status == 200) {
            const data = await response.json();
            for (let i = 0; i < data.length; i++) {
                data[i].lastModified = new Date(data[i].updatedAt)
            }
            this.setState({
                secondary: data,
            }, () => {
            })
        }
    }

    render() {
        const handleReplyClick = (e: any) => {
            e.preventDefault();
            this.setState({
                replyOpen: !this.state.replyOpen,
            })
        }
        const handleCancelClick = (e: any) => {
            e.preventDefault()
            this.setState({
                commentEntered: "",
                replyOpen: false,
            })
        }
        const handleInputChange = (e: any) => {
            e.preventDefault();
            this.setState({
                commentEntered: e.target.value,
            })
        }
        const handleSubmitClick = async (e: any) => {
            e.preventDefault();
            const url = process.env.REACT_APP_HOST + "/api/post/addComment/" + this.props.data.id;
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    content: this.state.commentEntered,
                    replyTo: this.props.data.id,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.status == 201) {
                this.setState({
                    commentEntered: "",
                    replyOpen: false,
                })
                this.fetchComment()
            }
            else {
                window.alert("댓글 작성에 실패했습니다. 오류가 계속되면 하단의 Contact Us 양식을 통해 문의해주세요.")
            }
        }

        const handleDeleteClick = async () => {
            if (window.confirm("정말 삭제하시겠습니까?")) {
                const url = process.env.REACT_APP_HOST + "/api/post/deleteComment/" + this.props.data.id;
                const response = await fetch(url, {
                    method: "POST"
                })
                if (response.status == 200) {
                    this.props.reset();
                }
                else {
                    window.alert("댓글을 삭제하지 못했습니다. 삭제 권한이 없을 수도 있습니다. 오류가 계속되면 하단의 Contact Us 양식을 통해 문의해주세요.")
                }
            }
        }

        const handleCommentDelete = (commentIndex: number) => {
            const temp = this.state.secondary;
            temp.splice(commentIndex, 1);
            this.setState({
                secondary: temp
            })
        }

        const ProfileBox = styled.div`
            position: relative;
            display: flex;
            flex-direction: row;
            left: 95px;
            align-items: flex-center;
        `

        const CommentInfoContainer = styled.div`
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            margin-left: 20px;
        `
        const Name = styled.span`
            font-size: 14px;
            line-height: 22px;
            font-weight: 700;
            word-wrap: break-word;
            box-sizing: border-box;
            text-align: left;
        `

        return (
            <Container>
                <LeftBar />
                <ProfileBox>
                    <ProfileImg src={this.props.data.author.profileImageUrl} dimension={32} isOnNavbar={true} />
                    <CommentInfoContainer>
                        <Name > {this.props.data.author.name} </Name>
                        <LastModified>
                            {DateToPrevString(this.props.data.lastModified)}
                        </LastModified>
                    </CommentInfoContainer>
                    {this.props.data.isMine ? <Delete onClick={handleDeleteClick}>Delete</Delete> : <div />}
                </ProfileBox>

                <Content>{this.props.data.content}</Content>

                <CommentUpvote style={{ position: 'relative', left: '160px', top: '34px' }} boardId={this.props.boardId} postId={this.props.postId} commentId={this.props.data.id} upvoteCount={this.props.data.upvoteCount} upvoted={this.props.data.upvoted} />
                <ReplyButton onClick={handleReplyClick}>Reply</ReplyButton>
                {this.state.replyOpen ? <Form>
                    <Input placeholder={'Reply...'} onChange={handleInputChange} value={this.state.commentEntered} />
                    <Cancel onClick={handleCancelClick}>Cancel</Cancel>
                    <Submit onClick={handleSubmitClick}>Post</Submit>
                </Form> : <div />}
                <Spacer />
                {this.state.secondary.map((element, i) => <Secondary reset={this.props.reset} delete={handleCommentDelete} index={i} data={element} boardId={this.props.boardId} postId={this.props.postId} userData={this.props.userData} />)}
            </Container>
        )
    }
}

export default Secondary;