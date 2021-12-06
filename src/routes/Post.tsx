import React from "react";
import { dbService } from "../utils/firebaseFunctions";
import Comment from '../components/Post/Comment';
import Navbar from "../components/Navbar";
import { FirestorePost } from '../types/FirestorePost'
import { FirebaseUser } from "../types/FirebaseUser";
import firebase from "firebase";
import styled from 'styled-components';
import CSS from 'csstype'
import OtherPost from '../components/Post/OtherPost'
import Upvote from "../components/Post/Upvote";
import { FaRegComment } from "react-icons/fa"
import { AiOutlineComment } from "react-icons/ai";

type PostProps = {
    boardId: string,
    postId: string,
    firebaseUserData: FirebaseUser
}

type PostState = {
    firestorePost: FirestorePost,
    errorMsg: string,
    commentArray: any[],
    commentIdArray: any[],
    profileImg: string,
    retrieved: boolean,
    accessGranted: boolean,
    recentPosts: any[],
    recentPostIds: any[],
}

const height = window.innerHeight;
const width = window.innerWidth;
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
`
const ProfileImg = styled.img`
    width: 20px;
    height: 20px;
    padding: 10px;
    border-radius: 25px;
    border: 1px solid white;
    background-color: #0B121C;
    position: absolute;
    left: 0%;
`
const Title = styled.p`
    position: relative;
    width: 65%;
    left: 70px;
    top: -10px;
    font-weight: 800;
    font-size: 22px;
    text-overflow: ellipsis;
    word-wrap: break-word;
`
const Content = styled.div`
    width: 70%;
    font-weight: 800;
    font-size: 13px;
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
    position: absolute;
    left: 70px;
    top: 90px;
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
class Post extends React.Component<PostProps, PostState> {
    constructor(props: PostProps) {
        super(props);
        this.state = {
            firestorePost: {
                title: "Title",
                content: "Content",
                isAnnouncement: false,
                isAnonymous: true,
                isPinned: false,
                isHidden: false,
                lastModified: firebase.firestore.Timestamp.fromDate(new Date()),
                upvoteArray: [],
                numComments: 0,
                permissions: [],
                author: "TempAuthor",
                authorId: "",
                parentBoardId: "",
                parentBoardTitle: "",
                parentColor: "",
                parentTextColor: ""
            },
            errorMsg: "",
            commentArray: [],
            commentIdArray: [],
            retrieved: false,
            accessGranted: false,
            recentPosts: [],
            recentPostIds: [],
            profileImg: 'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fprofile_default.png?alt=media&token=61ab872f-8f29-4d50-b22e-9342e0581fb5',

        }
    }

    componentDidMount = () => {
        this.fetchPost()
    }

    componentDidUpdate() {
        console.log(this.state.recentPosts)
        console.log(this.state.recentPostIds)
    }

    static getDerivedStateFromProps = (nextProps: PostProps, prevState: PostState) => {
        if (prevState.retrieved && prevState.firestorePost.permissions.includes(nextProps.firebaseUserData.role)) {
            return {
                accessGranted: true,
            }
        }
    }

    getLastUpdated = (time: any) => {
        const timeFromNow = (Date.now() - (time.seconds * 1000)) / 1000;
        const minutesFromNow = Math.floor(timeFromNow / 60)
        const hoursFromNow = Math.floor(timeFromNow / (60 * 60))
        if (hoursFromNow >= 1 && hoursFromNow < 24) {
            return hoursFromNow.toString() + " hours ago"
        }
        else if (minutesFromNow >= 1 && minutesFromNow < 60) {
            return minutesFromNow.toString() + " minutes ago"
        }
        else if (minutesFromNow <= 1) {
            return 'Just now'
        }
        else {
            return this.monthToString(time.toDate().getMonth()) + " " + time.toDate().getDate().toString() + " " + time.toDate().getFullYear().toString();
        }
    }

    monthToString = (month: number) => {
        if (month == 1) {
            return "January";
        }
        else if (month === 2) {
            return "February";
        }
        else if (month === 3) {
            return "March";
        }
        else if (month === 4) {
            return "April";
        }
        else if (month === 5) {
            return "May";
        }
        else if (month === 6) {
            return "June"
        }
        else if (month === 7) {
            return 'July'
        }
        else if (month === 8) {
            return 'August';
        }
        else if (month === 9) {
            return 'September'
        }
        else if (month === 10) {
            return 'October'
        }
        else if (month === 11) {
            return 'November'
        }
        else if (month === 12) {
            return "December"
        }
        else {
            return 'Invalid Month'
        }
    }

    fetchPost = () => {
        dbService // Retrieve post information
            .collection('boards').doc(this.props.boardId)
            .collection('posts')
            .doc(this.props.postId)
            .onSnapshot(async (querySnapshot) => {
                if (querySnapshot.exists) {
                    const data = querySnapshot.data() as FirestorePost;
                    if (data === undefined) {
                        return;
                    }
                    else {
                        this.setState({
                            firestorePost: {
                                title: data.title,
                                author: data.author,
                                authorId: data.authorId,
                                content: data.content,
                                isAnnouncement: data.isAnnouncement,
                                isAnonymous: data.isAnonymous,
                                isHidden: data.isHidden,
                                isPinned: data.isPinned,
                                lastModified: data.lastModified,
                                upvoteArray: data.upvoteArray,
                                permissions: data.permissions,
                                numComments: data.numComments,
                                parentBoardId: data.parentBoardId,
                                parentBoardTitle: data.parentBoardTitle,
                                parentColor: data.parentColor,
                                parentTextColor: data.parentTextColor
                            },
                            errorMsg: "Access denied; you do not have permission.",
                            accessGranted: data.permissions.includes(this.props.firebaseUserData.role) || data.permissions.includes('User') ? true : false,
                        })
                        dbService // retrieve comments within the post
                            .collection('boards').doc(this.props.boardId)
                            .collection('posts').doc(this.props.postId)
                            .collection('comments').where('isReply', '==', false).orderBy('lastModified').onSnapshot((querySnapshot1) => {
                                const commentObjs = querySnapshot1.docs;
                                const commentArray = [];
                                const commentIdArray = [];
                                for (let i = 0; i < commentObjs.length; i++) {
                                    commentArray.push(commentObjs[i].data());
                                    commentIdArray.push(commentObjs[i].id);
                                }
                                this.setState({
                                    commentArray: commentArray,
                                    commentIdArray: commentIdArray,
                                    retrieved: true,
                                })
                            })
                        const boardArray = ['announcement', 'event', 'general', 'grove', 'jobs'];
                        let postArray: any[] = [];
                        let postIdArray: any[] = [];
                        let tempArray: any[] = [];
                        for (let i = 0; i < boardArray.length; i++) {
                            const doc = await dbService
                            .collection('boards').doc(boardArray[i])
                            .collection('posts').orderBy('lastModified', 'desc').limit(10).get();

                            const postObjs = doc.docs;

                            for (let j = 0; j < postObjs.length; j++) {
                                tempArray.push([postObjs[j].data(), postObjs[j].id]);
                            }
                            tempArray = this.sortByLastModified(tempArray)
                        }
                        postArray = tempArray.map(element => element[0]);
                        postIdArray = tempArray.map(element => element[1]);
                        this.setState({
                            recentPosts: postArray,
                            recentPostIds: postIdArray,
                        })
                    }
                }
            })

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
            window.history.go(-1);
        }

        return (
            <div>
                <Navbar firebaseUserData={this.props.firebaseUserData} />
                <Container>
                    <Back onClick={handleBackClick}><img src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FwhiteArrow.png?alt=media&token=efa6ec9b-d260-464e-bf3a-77a73193055f'} style={imageStyle}/>Back</Back>
                    <Header>
                        <ProfileImg src={this.state.profileImg} />
                        <Title>{this.state.firestorePost.title}</Title>
                        <DateWritten>{this.getLastUpdated(this.state.firestorePost.lastModified)}</DateWritten>
                    </Header>
                    <Content dangerouslySetInnerHTML={{ __html: this.state.firestorePost.content }} />
                    <ETC>
                        <Upvote boardId={this.props.boardId} postId={this.props.postId} upvoteArray={this.state.firestorePost.upvoteArray} />
                        <FaRegComment size='20px' style={{ marginLeft: '10px' }} />
                        <CommentNum style={{ margin: '0px 5px' }}>
                            {this.state.firestorePost.numComments}
                        </CommentNum>

                    </ETC>
                    <Comment comments={this.state.commentArray} commentIds={this.state.commentIdArray} boardId={this.props.boardId} postId={this.props.postId} firebaseUserData={this.props.firebaseUserData}/>
                    <RecentPostTitle>Other posts</RecentPostTitle>
                    <RecentPosts>{this.state.recentPosts.map((element, i) => <OtherPost data={element} id={this.state.recentPostIds[i]}/>)}</RecentPosts>
                    {this.state.accessGranted ?
                        <>

                        </>
                        :
                        <>
                            You cannot view this page: {this.state.errorMsg}
                        </>
                    }
                </Container>

            </div>
        )
    }
}

export default Post;