import React from "react";
import { authService, dbService } from "../utils/firebaseFunctions";
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
import { RouteComponentProps } from "react-router-dom";
import DeletePost from '../components/Post/DeletePost';
import EditPostButton from '../components/Post/EditPostButton'
import Avatar from "../components/Profile/Avatar";

type RouteProps = {
    boardId: string,
    postId: string
}

type PostProps = RouteComponentProps<RouteProps> & {
    firebaseUserData: FirebaseUser,
    reloadFunction: Function
}

type PostState = {
    firestorePost: FirestorePost,
    errorMsg: string,
    commentArray: any[],
    commentIdArray: any[],
    authorProfile: FirebaseUser,
    retrieved: boolean,
    accessGranted: boolean,
    recentPosts: any[],
    recentPostIds: any[],
    toggle: boolean,
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
    width: 70%;
    display: flex;
    flex-direction: row;
    alignItems: center;
    justifyContent: center;
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
class Post extends React.Component<PostProps, PostState> {
    constructor(props: PostProps) {
        super(props);
        this.state = {
            firestorePost: {
                postId: "",
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
            toggle: false,
            errorMsg: "",
            commentArray: [],
            commentIdArray: [],
            retrieved: false,
            accessGranted: false,
            recentPosts: [],
            recentPostIds: [],
            authorProfile: {
                username: 'unknown user',
                userId: 'unknown userid',
                email: 'temp@email.com',
                verificationFile: undefined,
                isVerified: false,
                role: 'User',
                enrolledYear: undefined,
                major: undefined,
                faculty: undefined,
                profilePictureURL: undefined
            },
        }
    }

    componentDidMount = () => {
        this.fetchPost()
    }

    componentDidUpdate(prevProps: PostProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.fetchPost()
        }
    }

    static getDerivedStateFromProps = (nextProps: PostProps, prevState: PostState) => {
        if (prevState.retrieved && prevState.firestorePost.permissions.includes(nextProps.firebaseUserData.role)) {
            return {
                accessGranted: true,
            }
        } else {
            return null;
        }
    }

    reset = () => {
        this.fetchPost()
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
            return this.monthToString(time.toDate().getMonth() + 1) + " " + time.toDate().getDate().toString() + " " + time.toDate().getFullYear().toString();
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

    setPostState = (data: FirestorePost) => {
        this.setState({
            firestorePost: data
        })
        // this.forceUpdate()
    }

    fetchPost = async () => {
        dbService // Retrieve post information
            .collection('boards').doc(this.props.match.params.boardId)
            .collection('posts')
            .doc(this.props.match.params.postId)
            .onSnapshot(async (querySnapshot) => {
                if (querySnapshot.exists) {
                    const data = querySnapshot.data() as FirestorePost;
                    if (data === undefined) {
                        return;
                    }
                    else {
                        await dbService.collection('users').doc(data.authorId).get().then(snapshot => {
                            const authorData = snapshot.data() as FirebaseUser;
                            this.setState({
                                firestorePost: {
                                    ...data,
                                },
                                errorMsg: "Access denied; you do not have permission.",
                                accessGranted: data.permissions.includes(this.props.firebaseUserData.role) || data.permissions.includes('User') ? true : false,
                                authorProfile: authorData,
                            })
                        })
                        
                        dbService // retrieve comments within the post
                            .collection('boards').doc(this.props.match.params.boardId)
                            .collection('posts').doc(this.props.match.params.postId)
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
            this.props.history.push(`/boards/${this.props.match.params.boardId}`)
        }
        let key = 0;
        return (
            <div>
                <Navbar firebaseUserData={this.props.firebaseUserData} />
                <Container>
                    <Back onClick={handleBackClick}><img src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FwhiteArrow.png?alt=media&token=efa6ec9b-d260-464e-bf3a-77a73193055f'} style={imageStyle} />Back</Back>
                    <Header>
                        <ProfileImg firebaseUserData={this.state.authorProfile} dimension={32} isOnNavbar={true} />
                        <TitleAndDate>
                            <DateWritten>{this.getLastUpdated(this.state.firestorePost.lastModified)}</DateWritten>
                            <Title>{this.state.firestorePost.title}</Title>                            
                        </TitleAndDate>
                        <AuthorButtons>
                            {this.props.firebaseUserData.userId == this.state.firestorePost.authorId ? <DeletePost boardId={this.props.match.params.boardId} postId={this.props.match.params.postId} firebaseUserData={this.props.firebaseUserData} userId={this.props.firebaseUserData.userId}/> : <div/>}
                            {this.props.firebaseUserData.userId == this.state.firestorePost.authorId ? <span style={{
                                verticalAlign: 'bottom',
                                lineHeight: '58px',
                                color: 'white',
                                opacity: '0.6',
                            }}>|</span> : ''}
                            {this.props.firebaseUserData.userId == this.state.firestorePost.authorId ? <EditPostButton boardId={this.props.match.params.boardId} postId={this.props.match.params.postId} /> : <div/>}    
                        </AuthorButtons>
                        
                        
                    </Header>
                    <Content dangerouslySetInnerHTML={{ __html: this.state.firestorePost.content }} />
                    <ETC>
                        <Upvote boardId={this.props.match.params.boardId} postId={this.props.match.params.postId} upvoteArray={this.state.firestorePost.upvoteArray} />
                        <FaRegComment size='20px' style={{ marginLeft: '10px' }} />
                        <CommentNum style={{ margin: '0px 5px' }}>
                            {this.state.firestorePost.numComments}
                        </CommentNum>

                    </ETC>
                    <Comment reset={this.fetchPost} comments={this.state.commentArray} commentIds={this.state.commentIdArray} boardId={this.props.match.params.boardId} postId={this.props.match.params.postId} firebaseUserData={this.props.firebaseUserData} />
                    <RecentPostTitle>Other posts</RecentPostTitle>
                    <RecentPosts>{this.state.recentPosts.map((element, i) => {
                        key++
                        return <OtherPost
                            history={this.props.history}
                            location={this.props.location}
                            match={this.props.match}
                            key={key}
                            data={element}
                            postId={this.state.recentPostIds[i]}
                            reloadFunction={this.props.reloadFunction}
                        /> })}
                    </RecentPosts>
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