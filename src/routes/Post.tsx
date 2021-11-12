import React from "react";
import { dbService } from "../utils/firebaseFunctions";
import Comment from '../components/Post/Comment';
import Navbar from "../components/Navbar";
import { FirestorePost } from '../types/FirestorePost'
import { FirebaseUser } from "../types/FirebaseUser";
import firebase from "firebase";
import styled from 'styled-components';
import CSS from 'csstype'

type PostProps = {
    boardId: string,
    postId: string,
    firebaseUserData: FirebaseUser
}

type PostState = {
    firestorePost: FirestorePost,
    errorMsg: string,
    commentArray: any[],
    profileImg: string,
    retrieved: boolean,
    accessGranted: boolean,
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
const Title = styled.span`
    width: 40%;
    height: 50px;
    position: absolute;
    left: 70px;
    font-weight: 800;
    font-size: 22px;
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
    margin-bottom: 40px;
    left: 0%;
    position: relative;
    order: 3;
`
const UpvoteNum = styled.div`
    position: absolute;
    left: 0%;
    top: 0px;
    padding-left: 25px;
`
const UpvoteIcon = styled.img`
    width: 18px;
    height: 18px;
    border: none;
    position: absolute;
    left: 0px;
    top: 0px;
`
const CommentNum = styled.div`
    position: absolute;
    left: 30px;
    top: 0px;
    padding-left: 75px;
`
const CommentIcon = styled.img`
    width: 18px;
    height: 18px; 
    border: none;
    position: absolute;
    left: 50px;
    top: 0px;
`
const DateWritten = styled.span`
    position: absolute;
    left: 160px;
    top: 0px;
    color: #9c9c9c;
`
const Divider = styled.div`
    position: relative;
    order: 4;

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
                upvotes: 0,
                numComments: 0,
                permissions: [],
                author: "TempAuthor",
                parentBoardId: "",
                parentBoardTitle: "",
                parentColor: "",
                parentTextColor: ""
            },
            errorMsg: "",
            commentArray: [],
            retrieved: false,
            accessGranted: false,
            profileImg: 'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fprofile_default.png?alt=media&token=61ab872f-8f29-4d50-b22e-9342e0581fb5',

        }
    }

    componentDidMount = () => {
        this.fetchPost()
    }

    static getDerivedStateFromProps = (nextProps: PostProps, prevState: PostState) => {
        if (prevState.retrieved && prevState.firestorePost.permissions.includes(nextProps.firebaseUserData.role)) { 
            return {
                accessGranted: true,
            }
        }
    }

    fetchPost = () => {
        dbService // Retrieve post information
            .collection('boards').doc(this.props.boardId)
            .collection('posts')
            .doc(this.props.postId)
            .onSnapshot((querySnapshot) => {
                if (querySnapshot.exists) {
                    console.log(querySnapshot.data())
                    const data = querySnapshot.data() as FirestorePost;
                    console.log(this.props.firebaseUserData.role);
                    console.log(data.permissions.includes(this.props.firebaseUserData.role));
                    if (data === undefined) {
                        return;
                    }
                    else {
                        this.setState({
                            firestorePost: {
                                title: data.title,
                                author: data.author,
                                content: data.content,
                                isAnnouncement: data.isAnnouncement,
                                isAnonymous: data.isAnonymous,
                                isHidden: data.isHidden,
                                isPinned: data.isPinned,
                                lastModified: data.lastModified,
                                upvotes: data.upvotes,
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
                            .collection('comments').where('isReply', '==', false).orderBy('lastModified').onSnapshot((querySnapshot) => {
                                const commentObjs = querySnapshot.docs;
                                const commentArray = [];
                                for (let i = 0; i < commentObjs.length; i++) {
                                    commentArray.push(commentObjs[i].data());
                                }
                                console.log(commentArray)
                                this.setState({
                                    commentArray: commentArray,
                                    retrieved: true,
                                })
                            })
                        
                    }
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
                    <Back><img src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FwhiteArrow.png?alt=media&token=efa6ec9b-d260-464e-bf3a-77a73193055f'} style={imageStyle} onClick={handleBackClick}/>Back</Back>
                    <Header>
                        <ProfileImg src={this.state.profileImg} />
                        <Title>{this.state.firestorePost.title}</Title>
                    </Header>
                    <Content dangerouslySetInnerHTML={{__html: this.state.firestorePost.content}} />
                    <ETC>
                        <UpvoteNum>
                            <UpvoteIcon src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Flike.png?alt=media&token=fab6ba94-6f21-46db-bec3-6a754fb7eedb'}/>
                            {this.state.firestorePost.upvotes}
                        </UpvoteNum>
                        <CommentNum>
                            <CommentIcon src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fcomment.png?alt=media&token=3bfd6a4c-7bec-4858-8d4b-f6d5223dd1fe'}/>
                            {this.state.firestorePost.numComments}
                        </CommentNum>
                        <DateWritten>{this.state.firestorePost.lastModified.toDate().toUTCString()}</DateWritten>
                    </ETC>
                    <Comment comments={this.state.commentArray}/>
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