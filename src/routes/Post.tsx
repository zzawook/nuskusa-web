import React from "react";
import Comment from '../components/Post/Comment';
import Navbar from "../components/Navbar";
import { Post } from '../types/Post'
import { User } from "../types/User";
import firebase from "firebase";
import styled from 'styled-components';
import CSS from 'csstype'
import OtherPost from '../components/Post/OtherPost'
import Upvote from "../components/Post/Upvote";
import { FaCommentAlt, FaRegComment } from "react-icons/fa"
import { RouteComponentProps } from "react-router-dom";
import DeletePost from '../components/Post/DeletePost';
import EditPostButton from '../components/Post/EditPostButton'
import Avatar from "../components/Profile/Avatar";
import Event from "../components/Post/Event"
import { DateToPrevString } from "../utils/TimeHelper";

type RouteProps = {
    boardId: string,
    postId: string
}

type PostProps = RouteComponentProps<RouteProps> & {
    userData: User,
    reloadFunction: Function,
}

type PostState = {
    Post: Post,
    errorMsg: string,
    commentArray: any[],
    commentIdArray: any[],
    authorProfile: User,
    retrieved: boolean,
    recentPosts: any[],
    recentPostIds: any[],
    toggle: boolean,
    boardData: any[],
}

const Container = styled.div`
    width: 70%;
    position: absolute;
    top: 10vh;
    left: 15%;
    font-family: var(--font-family-roboto);
    display: flex;
    flex-direction: column;
`
const Back = styled.button`
    :hover {
        border: 1px solid white;
        color: white;
    }
    width: 95px;
    height: 41px;
    background-color: #18202B;
    order: 0;
    margin-top: 20px;
    margin-bottom: 40px;
    left: 0%;
    padding-top: 0px;
    color: #bfbfbf;
    border: none;
    font-weight: 600;
    padding-left: 30px;
`
const Header = styled.div`
    left: 0%;
    order: 1;
    height: 60px;
    width: 70%;
    display: flex;
    flex-direction: row;
    //align-items: center;
    //justify-content: center;
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
const TitleAndDate = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`
const Title = styled.p`
    width: 100%;
    font-weight: 800;
    font-size: 22px;
    text-overflow: ellipsis;
    word-wrap: break-word;
    margin-top: 0px;
`
const Content = styled.div`
    width: 70%;
    font-weight: 800;
    font-size: 15px;
    order: 2;
    left: 0%;
    word-wrap: break-word;
    overflow: scroll;
    line-height: 29px;
`
const ETC = styled.div`
    margin-top: 15px;
    left: 0%;
    display: flex;
    position: relative;
    order: 3;
`
const CommentNum = styled.div`
    position: flex;
    flex-direction: row;
    margin: auto 10px;
`

const DateWritten = styled.span`
    width: 350px;
    color: #9c9c9c;
    font-size: 14px;
    font-weight: 700;
    line-height: 24.4px;
`
const RecentPosts = styled.div`
    position: absolute;
    width: 30%;
    right: 0px;
    top: 140px;
`
const RecentPostTitle = styled.span`
    position: absolute;
    left: 70%;
    top: 100px;
    padding-left: 3%;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    color: #a8a8a8;
`
const AuthorButtons = styled.div`
    margin-left: auto;
`
class PostPage extends React.Component<PostProps, PostState> {
    constructor(props: PostProps) {
        super(props);
        this.state = {
            Post: {
                postId: "",
                title: "Title",
                content: "Content",
                isAnnouncement: false,
                isAnonymous: true,
                isPinned: false,
                isHidden: false,
                lastModified: new Date(),
                upvoteCount: 0,
                upvoted: false,
                commentCount: 0,
                author: {
                    name: "",
                    email: "",
                    role: "",
                    yearOfBirth: "",
                },
                board: {
                    title: "",
                    description: "",
                    boardId: "",
                    boardColor: "",
                    boardTextColor: "",
                },
                hasRoot: false,
            },
            toggle: false,
            errorMsg: "",
            commentArray: [],
            commentIdArray: [],
            retrieved: false,
            recentPosts: [],
            recentPostIds: [],
            authorProfile: {
                name: 'unknown user',
                email: 'temp@email.com',
                role: 'User',
                enrolledYear: "2022/2023",
                major: "Major",
                faculty: "Faculty",
                profileImageUrl: "profileImageUrl",
                yearOfBirth: "",
            },
            boardData: [],
        }
    }

    componentDidMount = () => {
        this.fetchPost()
        this.fetchBoard()
        this.fetchRecentPost()
    }

    componentDidUpdate(prevProps: PostProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.fetchPost()
        }
    }

    static getDerivedStateFromProps = (nextProps: PostProps, prevState: PostState) => {
        
    }

    reset = () => {
        this.fetchPost()
        this.fetchBoard()
        this.fetchRecentPost()
    }

    fetchBoard = async () => {
        const url = process.env.REACT_APP_HOST + "/api/board/getBoards";
        const response = await fetch(url, {
            method: "GET",
        })

        if (response.status == 200) {
            const boards = await response.json();
            this.setState({
                boardData: boards
            })
        }
    }

    fetchRecentPost = async () => {
        const url = process.env.REACT_APP_HOST + "/api/post/getRecentPosts";
        const response = await fetch(url, {
            method: "GET"
        })

        if (response.status == 200) {
            const recentPosts = await response.json()
            for (let i = 0; i < recentPosts.length; i++) {
                recentPosts[i].postId = recentPosts[i].id
            }
            this.setState({
                recentPosts: recentPosts
            })
        }
    }

    setPostState = (data: Post) => {
        this.setState({
            Post: data
        })
    }

    fetchPost = async () => {
        const url = process.env.REACT_APP_HOST + "/api/post/getPost/" + this.props.match.params.postId;
        const response = await fetch(url, {
            method: "GET"
        })

        if (response.status == 200) {
            const post = await response.json();
            post.lastModified = new Date(post.updatedAt);
            post.lastModified.setHours(post.lastModified.getHours() - 8);
            console.log(post);
            this.setState({
                Post: post,
            })
        }
    }

    

    sortByLastModified(posts: any[]) {
        return posts.sort((a: any, b: any) => {
            if (a[0].lastModified.seconds > b[0].lastModified.seconds) {
                return -1;
            }/*
            else if (a[0].lastModified.seconds < b[0].lastModified.seconds){
                return 1;
            }*/
            else {
                return 0;
            }
        })
    }

    render = () => {
        const imageStyle: CSS.Properties = {
            position: 'absolute',
            top: '32px',
            left: '15px',
            height: '15px',
        }
        const handleBackClick = (e: any) => {
            e.preventDefault();
            this.props.history.push(`/boards/${this.props.match.params.boardId}`)
        }
        let key = 0;
        return (
            <div>
                <Navbar userData={this.props.userData} />
                <Container>
                    <Back onClick={handleBackClick}><img src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FwhiteArrow.png?alt=media&token=efa6ec9b-d260-464e-bf3a-77a73193055f'} style={imageStyle} />Back</Back>
                    <Header>
                        <ProfileImg src={this.state.Post.author.profileImageUrl} dimension={32} isOnNavbar={true} />
                        <TitleAndDate>
                            <DateWritten>{DateToPrevString(this.state.Post.lastModified)}</DateWritten>
                            <Title>{this.state.Post.title}</Title>
                        </TitleAndDate>
                        <AuthorButtons>
                            {this.state.Post.hasRoot ? <DeletePost boardId={this.props.match.params.boardId} postId={this.props.match.params.postId} userData={this.props.userData} userId={this.props.userData.email} /> : <div />}
                            {this.state.Post.hasRoot ? <span style={{
                                verticalAlign: 'bottom',
                                lineHeight: '58px',
                                color: 'white',
                                opacity: '0.6',
                            }}>|</span> : ''}
                            {this.state.Post.hasRoot ? <EditPostButton boardId={this.props.match.params.boardId} postId={this.props.match.params.postId} /> : <div />}
                        </AuthorButtons>
                    </Header>
                    {this.state.Post.isEvent ? <Event data={this.state.Post.content} title={this.state.Post.title} userData={this.props.userData} /> : <Content dangerouslySetInnerHTML={{ __html: this.state.Post.content }} />}
                    <ETC>
                        <Upvote boardId={this.props.match.params.boardId} postId={this.props.match.params.postId} upvoteCount={this.state.Post.upvoteCount} upvoted={this.state.Post.upvoted}/>
                        <FaRegComment size='20px' style={{ marginLeft: '10px' }} />
                        <CommentNum style={{ margin: '0px 5px' }}>
                            {this.state.Post.commentCount}
                        </CommentNum>

                    </ETC>

                    <Comment reset={this.fetchPost} boardId={this.props.match.params.boardId} postId={this.props.match.params.postId} userData={this.props.userData} />
                    <RecentPostTitle>Other posts</RecentPostTitle>
                    <RecentPosts>{this.state.recentPosts.map((element, i) => {
                        key++
                        return <OtherPost
                            history={this.props.history}
                            location={this.props.location}
                            match={this.props.match}
                            key={key}
                            data={element}
                            reloadFunction={this.props.reloadFunction}
                        />
                    })}
                    </RecentPosts>
                </Container>

            </div>
        )
    }
}

export default PostPage;